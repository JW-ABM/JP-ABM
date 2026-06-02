export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json();
  const { email } = body;

  // 1. 生成 6 位随机验证码
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // 2. 调用 Resend 发送邮件
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${env.RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev",
      to: email,
      subject: "墨金系统验证码",
      html: `你的登录验证码是: <strong>${code}</strong>，请在 5 分钟内使用。`
    })
  });

  // 3. 返回成功状态
  return new Response(JSON.stringify({ success: true, message: "验证码已发送" }), {
    headers: { "Content-Type": "application/json" }
  });
}
