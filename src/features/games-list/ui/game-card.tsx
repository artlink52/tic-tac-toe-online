import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import React from "react";

export function GameCard({
  login,
  rating,
  actions,
}: {
  login: string;
  rating: number;
  actions: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Игра с {login}</CardTitle>
        </CardHeader>

        <CardContent>Рейтинг: {rating}</CardContent>
        <CardFooter>{actions}</CardFooter>
      </Card>
    </div>
  );
}
