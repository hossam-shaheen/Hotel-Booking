import { th } from "date-fns/locale";
import supabase from "./supabase";
import toast from "react-hot-toast";

export async function getAllCabins() {
  let { data: cabins, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not get loaded");
  }

  return cabins;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("Cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Booking could not be deleted");
  }
  return data;
}

export async function createCabin(cabin) {
  const isEditMode = cabin?.id;

  if (isEditMode) {
    const { data: cabinData, error: insertError } = await supabase
      .from("Cabins")
      .update({
        name: cabin.name,
        maxCapacity: cabin.maxCapacity,
        regularPrice: cabin.regularPrice,
        discount: cabin.discount,
        description: cabin.description,
        image: cabin.image,
      })
      .eq("id", cabin.id);
    if (insertError) {
      throw new Error("Cabin could not be updated");
    }
    return;
  }

  const currentImage = cabin.image[0];
  // 1) Upload image to storage
  const { data: image, error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(`${currentImage.name}`, currentImage, {
      cacheControl: "3600",
      upsert: false,
    });

  // 2) check if image upload fails
  if (storageError && storageError.statusCode !== "409") {
    // Handle error if image upload fails
    toast.error("Image could not be uploaded");
    throw new Error("Image could not be uploaded");
  }

  // 3) Get public URL of the image and insert cabin data
  // status code 409 means the image already exists
  if ((storageError && storageError.statusCode === "409") || image) {
    const { data: publicURLData, error: publicURLFetchError } = await supabase.storage
        .from("cabin-images")
        .getPublicUrl(`${currentImage.name}`);

    if (publicURLFetchError) {
      toast.error("Can't get public URL for the image");
      throw new Error("Can't get public URL for the image");
    }
    const { data: cabinData, error: insertError } = await supabase
      .from("Cabins")
      .insert([
        {
          name: cabin.name,
          maxCapacity: cabin.maxCapacity,
          regularPrice: cabin.regularPrice,
          discount: cabin.discount,
          description: cabin.description,
          image: publicURLData.publicUrl,
        },
      ]);
    return;
  }
}

export async function duplicateCabin(cabin) {
  const { data: cabinData, error: insertError } = await supabase
    .from("Cabins")
    .insert([
      {
        name: cabin.name,
        maxCapacity: cabin.maxCapacity,
        regularPrice: cabin.regularPrice,
        discount: cabin.discount,
        description: cabin.description,
        image: cabin.image,
      },
    ]);
  if (insertError) {
    throw new Error("Cabin could not be duplicated");
  }
}
