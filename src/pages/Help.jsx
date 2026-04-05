import React from "react";

function Help() {
  const detailCards = [
    {
      label: "Developer",
      value: "Himanshu Sheetlani",
    },
    {
      label: "Role",
      value: "Full Stack Web Developer",
    },
    {
      label: "Email",
      value: "himanshu.sheetlani2909@gmail.com",
    },
    {
      label: "LinkedIn",
      value: 'https://www.linkedin.com/in/himanshu-sheetlani/',
    },
  ];

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200/80">
          Help & Support
        </p>
        <h2 className="text-3xl font-semibold text-white tracking-tight">
          About The Developer
        </h2>
        <p className="max-w-3xl text-sm sm:text-base text-[#9a9a9a] leading-relaxed">
          This Finance Dashboard was developed by Himanshu Sheetlani, a Full Stack Web Developer focused on creating polished interfaces and practical
          Stack Developer focused on creating polished interfaces and practical
          digital products.
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="bg-[#161616] border border-[#222] rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-cyan-200/10 border border-cyan-200/20 flex items-center justify-center text-3xl font-semibold text-cyan-200 shrink-0">
              <img className="rounded-2xl" src="https://media.licdn.com/dms/image/v2/D4D03AQEobXfKu7eP5Q/profile-displayphoto-shrink_200_200/B4DZUUU3URGcAc-/0/1739802769366?e=1776902400&v=beta&t=D_xjb1KCLqDyoGvMu1uJVfHXLJI4e-xqhtvoOVW35tU" alt="Himanshu Sheetlani" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white">
                Himanshu Sheetlani
              </h3>
              <p className="text-sm text-cyan-200 mt-1">Full Stack Web Developer</p>
              <p className="text-sm text-[#8d8d8d] mt-2 leading-relaxed">
                Passionate about building end-to-end products with thoughtful
                UI, reliable functionality, and a strong focus on usability.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {detailCards.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[#262626] bg-[#121212] p-4"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#777]">
                  {item.label}
                </p>
                <p className="text-white text-sm sm:text-base mt-2 leading-relaxed">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Help;
