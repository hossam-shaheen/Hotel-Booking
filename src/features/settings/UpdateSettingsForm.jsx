import { useForm } from "react-hook-form";
import { Button } from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow, { Label } from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Error } from "../../ui/Error";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSettings, updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";
import { useEffect } from "react";
import useUpdateSettings from "../../hooks/useUpdateSettings";

function UpdateSettingsForm({ settings }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      minBookingLength: settings.minBookingLength || "",
      maxBookingLength: settings.maxBookingLength || "",
      maxGuestsPerBooking: settings.maxGuestsPerBooking || "",
      breakFastPrice: settings.breakFastPrice || "",
    },
  });

  const { updatedSettingsData } = useUpdateSettings();

  const onSubmit = (data) => {
    const newSettings = {
      id: settings.id,
      ...data,
    };
    updatedSettingsData(newSettings);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="min-nights">Minimum nights/booking</Label>
        <Input
          type="number"
          id="min-nights"
          {...register("minBookingLength", {
            required: "Minimum nights/booking is required!",
          })}
        />
        {errors?.minBookingLength?.type === "required" && (
          <Error> {errors?.minBookingLength?.message} </Error>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor="max-nights">Maximum nights/booking</Label>
        <Input
          type="number"
          id="max-nights"
          {...register("maxBookingLength", {
            required: "Maximum nights/booking is required!",
          })}
        />
        {errors?.maxBookingLength?.type === "required" && (
          <Error> {errors?.maxBookingLength?.message} </Error>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor="max-guests">Maximum guests/booking</Label>
        <Input
          type="number"
          id="max-guests"
          {...register("maxGuestsPerBooking", {
            required: "Maximum guests/booking is required!",
          })}
        />
        {errors?.maxGuestsPerBooking?.type === "required" && (
          <Error> {errors?.maxGuestsPerBooking?.message} </Error>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor="breakfast-price">Breakfast price</Label>
        <Input
          type="number"
          id="breakfast-price"
          {...register("breakFastPrice", {
            required: "Breakfast price is required!",
          })}
        />
        {errors?.breakFastPrice?.type === "required" && (
          <Error> {errors?.breakFastPrice?.message} </Error>
        )}
      </FormRow>

      <FormRow>
        <Button>Edit settings</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
