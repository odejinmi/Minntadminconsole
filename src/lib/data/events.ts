import {
  EventStatus,
  type EventTicket,
  type Metric,
  type Paginated,
} from "./types";

const COMPARISON_WEEK = "vs last week";

function delay<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

export function getEventStats(): Promise<Metric[]> {
  return delay([
    {
      id: "ticketsSold",
      label: "Tickets sold",
      value: "8,402",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "activeEvents",
      label: "Active events",
      value: "62",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    { id: "topCategory", label: "Top category", value: "Technology" },
    {
      id: "revenue",
      label: "Revenue (30d)",
      value: "₦248M",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
  ]);
}

const ticket = (
  id: string,
  customer: string,
  event: string,
  qty: number,
  amountLabel: string,
  status: EventStatus,
): EventTicket => ({ id, customer, event, qty, amountLabel, status });

const tickets: EventTicket[] = [
  ticket("EV-9920", "Adaeze O.", "Davido Live · Lagos", 2, "₦842,000", EventStatus.Confirmed),
  ticket("EV-9917", "Femi A.", "Afronation 2026", 4, "₦82,500", EventStatus.Confirmed),
  ticket("EV-9914", "Sarah M.", "Burna Boy · O2 Arena", 1, "₦612,000", EventStatus.Pending),
  ticket("EV-9911", "Tunde K.", "Wizkid · Eko Convention", 2, "₦184,000", EventStatus.Failed),
  ticket("EV-9908", "Grace W.", "Asake · Lagos", 3, "₦264,000", EventStatus.Confirmed),
  ticket("EV-9905", "Ibrahim S.", "Tech Summit · Abuja", 1, "₦45,000", EventStatus.Pending),
];

export function getEventTickets(): Promise<Paginated<EventTicket>> {
  return delay({ data: tickets, total: 97 });
}
