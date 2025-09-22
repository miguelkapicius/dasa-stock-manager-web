import type { Alert } from "@/types/alert.type";
import { AlertCard } from "./_components/alert-card";
import { Fragment } from "react";

export default async function AlertsPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/alerts`,
    {
      next: {
        revalidate: 5,
      },
    }
  );

  const alerts: Alert[] = await response.json();

  return (
    <div className="space-y-12">
      <h2 className="font-medium text-2xl tracking-tight">Alertas</h2>

      <div>
        <section className="grid gap-4 max-w-4xl">
          {alerts.map((alert) => (
            <Fragment key={alert.id}>
              {alert.status && <AlertCard {...alert} />}
            </Fragment>
          ))}
        </section>
      </div>
    </div>
  );
}
