import fs from "fs";
import path from "path";
import { ImageResponse } from "@vercel/og";
import type { APIRoute } from "astro";
import { createSBSSR } from "@/lib/server/supabase";

// export { getStaticPaths } from './[id].astro';

export const prerender = false;

const e = (tag: string, tw: string, children: any[], props?: any) => ({
  type: tag,
  props: { children, tw, ...props },
});

export const GET: APIRoute = async ({ request, params, cookies }) => {
  const { id } = params;
  const supabase = createSBSSR({ cookies });

  const { error, data: user } = await supabase
    .from("profiles")
    .select("username, full_name, job_description,id, promo_mails")
    .eq("ticket", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  // using custom font files
  const JBbold = fs.readFileSync(
    path.resolve("./src/assets/JetBrainsMono-Bold.ttf"),
  );
  const JBregular = fs.readFileSync(
    path.resolve("./src/assets/JetBrainsMono-Medium.ttf"),
  );

  const field = (key: string) => e("span", "text-teal-300", [key])

  const row = (children: any[], classes?: string) => e("div", `flex ${classes}`, children)
  const comment = (text: string) => e("span", "text-slate-500", text)
  const hiString = (text: string) => e("span", "text-amber-300", text)
  const hiVar = (text: string) => e("span", "text-orange-200", text)
  const hiWarning = (text: string) => e("span", "text-red-400", text)
  const hiConstructor = (text: string) => e("span", "text-teal-300", text)
  const indent = (children: any[]) => e("span", "ml-[3rem]", children)
  const val = (value: any) => {
    if (value === "nil") {
      return hiWarning("nil")
    }
    if (value === "true") {
      return hiVar("true")
    }

    const type = typeof value;

    if(type === "number") return e(
      "span",
      "text-purple-300 inline-block",
      `${value}`,
    )

    return hiString(`"${value}"`)
  }
  const kv = (key: string, value: string | number) =>
    e("div", "flex text-slate-500", [
      field(key), " = ", val(value), ","
    ])

  const html = e(
    "div",
    "w-full h-full flex flex-col text-4xl items-center justify-center relative bg-black text-teal-400 border rounded-2xl",
    [
      {
          type: "img",
          props: {
            src: import.meta.env.PUBLIC_AUTH_REDIRECT_HOST + "/logo.svg",
            tw: "absolute -top-10 -left-20 opacity-25 -z-10",
            width: 800,
            height: 800,
          }
        },

      e(
        "div",
        "flex absolute right-4 bottom-4 text-slate-700 text-xl border-b border-b-slate-700",
        `verification: ${user.id.split("-").at(0)}-${(2023).toString(16)}-${Number(id).toString(16)}-${(Math.random() * 2000).toFixed(0).toString(16)}`
      ),
      {
        type: "pre",
        props: {
          tw: "text-slate-500 flex flex-col bg-slate-800 p-8 rounded-lg border border-4 border-slate-600",
          children: [
            row(comment(`--- @see https://www.neovimconf.live`)),
            row([
              hiVar("require "),
              hiString('"NEOVIMCONF.live" '),
              hiVar(".permit "),
              hiConstructor("{"),
            ]),
            row(indent(kv("date", "2023-12-08"))),
            row(indent(kv("ticket_nr", id.padStart(4, "0")))),
            user?.full_name && row(indent(comment(`-- aka ${user?.full_name}:`))),
            row(indent(kv("username", "nil"))),
            row(indent(kv("job_description", user?.job_description ?? "nil"))),
            user?.promo_mails && row(indent(kv("special_treatment", "true"))),
            row(hiConstructor("}"))
          ]
        }
      }, 
    ], {
    style: {
      fontFamily: "JetBrains Mono Regular",
    }
  },
  );

  // @ts-ignore
  return new ImageResponse(html, {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: "JetBrains Mono Bold",
        data: JBbold.buffer,
        style: "normal",
      },
      {
        name: "JetBrains Mono Regular",
        data: JBregular.buffer,
        style: "normal",
      },
    ],
  });
};
