import { useState, type FormEventHandler } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodError, z } from "zod";
import { FormError } from "./FormError";

export interface Props {
  errors?: { email?: string[] };
}

type FormStatus = {
  pending: boolean;
  data: RegisterFormFields | null;
  errors: {
    email?: string[],
  } | null
}

export const SignUpSchema = z.object({
  email: z.string().email("Pleaser enter a valid email address"),
  promo_mails: z.boolean()
});

export type RegisterFormFields = z.infer<typeof SignUpSchema>;

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors, isValid, isDirty }, formState, setError } = useForm<RegisterFormFields>({
    resolver: zodResolver(SignUpSchema)
  });

  const hasError = (field: string) => (errors as any)?.[field]?.length > 0;

  const onSubmit: SubmitHandler<RegisterFormFields> = (data) => {
    fetch("/api/register", {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      method: "POST",
    }).then((response) => {
      if (response.status !== 200) {
        response.json().then((data) => {
          setError("root.serverError", data)
        });
      } else {
        window.location.href="/register/success"
      }
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto space-y-4" >
        {errors.root?.message && (
          <FormError>
            {errors.root.message.toString()}
          </FormError>
        )}
        <div className={[hasError("email") ? "text-red-500" : null].join(" ")}>
          <label htmlFor="email" className="text-sm font-mono p-1">
            E-Mail:
          </label>
          <input
            className="block w-full p-2 shadow-inner border rounded-sm placeholder:text-slate-400 dark:bg-slate-800 dark:border-teal-500"
            placeholder="eg: smart-developer@example.com"
            id="email"
            type="text"
            {...register("email")}
            required
          />
          {errors.email?.message && (
            <p className="text-red-500 text-sm text-right">
              {errors.email.message.toString()}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="promo_mails" className="text-sm p-1 relative pl-5 block">
            <input
              type="checkbox"
              id="promo_mails"
              className="absolute left-0 top-2"
              {...register("promo_mails")}
            />{" "}
            I'm okay with receiving announcements about
            neovimconf via email. (optional)
          </label>
        </div>

        <div className="text-right">
          <button className="inline-block relative text-center bg-teal-300 p-2 rounded-sm hover:bg-teal-200 dark:text-teal-900 font-mono disabled:opacity-50" type="submit" disabled={!isDirty || !isValid}>
            {formState.isSubmitSuccessful ? "Signing up..." : "Sign up!"}
          </button>
        </div>
      </form>
    </>
  );
};
