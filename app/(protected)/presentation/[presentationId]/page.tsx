"use client";
import { getProjectById } from "@/actions/projects";
import { Spinner } from "@/components/ui/spinner";
import { themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { useTheme } from "next-themes";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { sileo } from "sileo";

type Props = {};

export default function page(props: Props) {
  const { setSlides, setProject, currentTheme, setCurrentTheme } =
    useSlideStore();
  const params = useParams();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async () => {
      try {
        const res = await getProjectById(params.presentationId as string);
        if (res.status !== 200 || !res.data) {
          sileo.error({
            title: "Error",
            description: "Unable to fetch project",
          });
          redirect("/dashboard");
        }

        const findTheme = themes.find(
          (theme) => theme.name === res.data.themeName,
        );
        setCurrentTheme(findTheme || themes[0]);
        setTheme(findTheme?.type === "dark" ? "dark" : "light");
        setProject(res.data);
        setSlides(JSON.parse(JSON.stringify(res.data.slides)));
      } catch (error) {
        sileo.error({
          title: "Error",
          description: "An unexpected error occurred",
        });
      } finally {
        setIsLoading(false);
      }
    };
  }, []);

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
}
