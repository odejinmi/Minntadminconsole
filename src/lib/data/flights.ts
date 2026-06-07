import {
  BookingStatus,
  type FlightBooking,
  type Metric,
  type Paginated,
} from "./types";

const COMPARISON_WEEK = "vs last week";

function delay<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

export function getFlightStats(): Promise<Metric[]> {
  return delay([
    {
      id: "flightsBooked",
      label: "Flights booked",
      value: "412",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "international",
      label: "International",
      value: "168",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "avgLeadTime",
      label: "Avg lead time",
      value: "11 days",
      delta: 12.4,
      trend: "down",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "revenue",
      label: "Revenue (30d)",
      value: "₦184M",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
  ]);
}

const flight = (
  id: string,
  customer: string,
  from: string,
  to: string,
  airline: string,
  amountLabel: string,
  status: BookingStatus,
): FlightBooking => ({ id, customer, from, to, airline, amountLabel, status });

const flights: FlightBooking[] = [
  flight("FL-9921", "Adaeze O.", "LOS", "DXB", "Emirates", "₦842,000", BookingStatus.Confirmed),
  flight("FL-9918", "Femi A.", "ABV", "LOS", "Air Peace", "₦82,500", BookingStatus.Confirmed),
  flight("FL-9912", "Sarah M.", "LOS", "JNB", "Ethiopian", "₦612,000", BookingStatus.Pending),
  flight("FL-9908", "Tunde K.", "LOS", "ACC", "Africa World", "₦184,000", BookingStatus.Canceled),
  flight("FL-9905", "Grace W.", "ABV", "DXB", "Qatar", "₦905,000", BookingStatus.Confirmed),
  flight("FL-9901", "Ibrahim S.", "KAN", "LOS", "Air Peace", "₦64,000", BookingStatus.Pending),
];

export function getFlightBookings(): Promise<Paginated<FlightBooking>> {
  return delay({ data: flights, total: 97 });
}
