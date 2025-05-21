import { PAGE_SIZE } from "../utils/Constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getAllBookings(
  currentBookingStatus,
  currentBookingSorting,
  currentPage
) {
  let bookings = supabase;
  bookings = supabase
    .from("Bookings")
    .select("*, Cabins(name),Guests(fullName,email)", {
      count: "exact",
    });

  if (currentBookingStatus !== "all" && currentBookingStatus) {
    bookings = bookings.eq("status", currentBookingStatus);
  }

  if (currentBookingSorting) {
    const [field, fieldOrder] = currentBookingSorting?.split("-");

    bookings = bookings.order(field, { ascending: fieldOrder === "asc" });
  }

  const from = currentPage * PAGE_SIZE - PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  if (currentPage) {
    bookings = bookings.range(from, to);
  }

  const { data, error, count } = await bookings;

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }
  return {
    data,
    count,
  };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, Cabins(*), Guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("Bookings")
    .update({
      ...obj,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("Bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

// export async function getAllBookings (){

//   let { data: Bookings, error } = await supabase
//   .from('Bookings')
//   .select('*');

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }

//   return Bookings;
// }
