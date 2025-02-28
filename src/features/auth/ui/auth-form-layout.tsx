import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import React from "react";

export function AuthFormLayout({
  title,
  description,
  fields,
  actions,
  link,
  error,
  action,
}: {
  title: string;
  description: string;
  fields: React.ReactNode;
  actions: React.ReactNode;
  link: React.ReactNode;
  error: React.ReactNode;
  action: (formData: FormData) => void;
}) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {title}
        </CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form action={action}>
          {fields}
          {error}
          {actions}
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">{link}</CardFooter>
    </Card>
  );
}
