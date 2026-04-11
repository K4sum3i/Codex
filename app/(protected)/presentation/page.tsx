import { redirect } from "next/navigation";

type Props = {};

export default function page(props: Props) {
  redirect("/dashboard");
}
