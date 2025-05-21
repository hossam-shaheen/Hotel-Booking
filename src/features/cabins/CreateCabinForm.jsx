import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import { Button } from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow, { Label } from "../../ui/FormRow";
import { Error } from "../../ui/Error";
import useCreateEditCabin from "../../hooks/useCreateEditCabin";

function CreateCabinForm({ cabin, onClick }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: cabin?.name || "",
      maxCapacity: cabin?.maxCapacity || "",
      regularPrice: cabin?.regularPrice || "",
      discount: cabin?.discount || "",
      description: cabin?.description || "",
    },
  });

  const { createNewCabin } = useCreateEditCabin(createCabin, reset, cabin?.id);

  const onSubmit = (data) => {
    if (cabin?.id) {
      createNewCabin({
        id: cabin.id,
        ...data,
        image: cabin.image,
      });
    } else {
      createNewCabin(data);
    }
    onClick?.();
  };

  const onCancel = () => {
    onClick?.();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
        {errors?.name?.type === "required" && (
          <Error>{errors.name?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum value is 1",
            },
            max: {
              value: 10,
              message: "Maximum value is 10",
            },
          })}
        />
        {errors?.maxCapacity?.type === "required" && (
          <Error>{errors.maxCapacity?.message}</Error>
        )}
        {errors?.maxCapacity?.type === "min" && (
          <Error>{errors.maxCapacity?.message}</Error>
        )}
        {errors?.maxCapacity?.type === "max" && (
          <Error>{errors.maxCapacity?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "This field is required" })}
        />
        {errors?.regularPrice?.type === "required" && (
          <Error>{errors.regularPrice?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          {...register("discount", { required: "This field is required" })}
        />
        {errors?.discount?.type === "required" && (
          <Error>{errors.maxCapacity?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          {...register("description", {
            required: "This field is required",
            minLength: {
              value: 10,
              message: "Min length is 10",
            },
            maxLength: {
              value: 50,
              message: "Max length is 50",
            },
          })}
        />
        {errors?.description?.type === "required" && (
          <Error> {errors?.description?.message} </Error>
        )}
        {errors?.description?.type === "minLength" && (
          <Error>{errors?.description?.message} </Error>
        )}
        {errors?.description?.type === "maxLength" && (
          <Error>{errors?.description?.message} </Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image")}
          disabled={cabin?.image?.includes("http")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        {cabin?.id ? (
          <Button $size="medium" $variation="secondary" onClick={onCancel}>
            Cancel
          </Button>
        ) : (
          <Button
            $size="medium"
            $variation="secondary"
            type="reset"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button $size="medium" $variation="primary">
          {cabin?.id ? "Edit cabin" : "Create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
