"use client";

import { useForm } from "react-hook-form";
import { useDoctorContext } from "@/context/doctorContext";
import { NewDoctor } from "@/types/doctorTypes";
import { Button } from "./ui/Button";

type FormData = {
  name: string;
  experience: number;
  language: string;
  faculty: string;
  onlineFees?: number;
  consultFees?: number;
  isAvailable: boolean;
  gender: string;
  speciality: string;
  mode: string[];
  clinicLocation: string;
  qualification: string;
  about: string;
};

type AddDoctorProps = {
  onClose: () => void;
};

export default function AddDoctor({ onClose }: AddDoctorProps) {
  const { addDoctor } = useDoctorContext();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { isAvailable: true, mode: [] },
  });

  const modes = watch("mode") || [];
  const onlineSelected = modes.includes("online");
  const physicalSelected = modes.includes("physical");

  const onSubmit = async (data: FormData) => {
    const newDoc: NewDoctor = {
      name: data.name,
      image: `https://randomuser.me/api/portraits/${data.gender}/${Math.floor(
        Math.random() * 100
      )}.jpg`,
      experience: data.experience,
      qualification: data.qualification,
      clinicLocation: data.clinicLocation,
      speciality: data.speciality.split(",").map((s) => s.trim()),
      about: data.about.split(",").map((a) => a.trim()),
      mode: data.mode,
      language: data.language.split(",").map((l) => l.trim()),
      faculty: data.faculty,
      // assign fees only if selected
      ...(onlineSelected && { consult_fees: data.onlineFees! }),
      ...(physicalSelected && { Physical_fees: data.consultFees! }),
      isAvailable: data.isAvailable,
    };

    await addDoctor(newDoc);
    reset();
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-white rounded-lg shadow"
    >
      <h2 className="col-span-full text-xl font-bold">Add New Doctor</h2>

      <div>
        <label className="block">Name *</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="w-full border px-2 py-1 rounded"
          placeholder="Dr. SomDO"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block">Experience (yrs) *</label>
        <input
          type="number"
          {...register("experience", {
            required: "Experience is required",
            valueAsNumber: true,
            min: { value: 0, message: "Must be at least 0" },
          })}
          placeholder="Experience"
          className="w-full border px-2 py-1 rounded"
        />
        {errors.experience && (
          <p className="text-red-500 text-sm">{errors.experience.message}</p>
        )}
      </div>

      <div>
        <label className="block">Language *</label>
        <input
          {...register("language", { required: "Language is required" })}
          placeholder="English, Hindi"
          className="w-full border px-2 py-1 rounded"
        />
        {errors.language && (
          <p className="text-red-500 text-sm">{errors.language.message}</p>
        )}
      </div>

      <div>
        <label className="block">Faculty *</label>
        <input
          {...register("faculty", { required: "Faculty is required" })}
          className="w-full border px-2 py-1 rounded"
          placeholder="Apollo Hospitals"
        />
        {errors.faculty && (
          <p className="text-red-500 text-sm">{errors.faculty.message}</p>
        )}
      </div>

      <div>
        <label className="block">Qualification *</label>
        <input
          {...register("qualification", {
            required: "Qualification is required",
          })}
          className="w-full border px-2 py-1 rounded"
          placeholder="MBBS, MD (Neurology)"
        />
        {errors.qualification && (
          <p className="text-red-500 text-sm">{errors.qualification.message}</p>
        )}
      </div>

      <div>
        <label className="block">Clinic Location *</label>
        <input
          {...register("clinicLocation", {
            required: "Clinic location is required",
          })}
          className="w-full border px-2 py-1 rounded"
          placeholder="Apollo Hospital - Mumbai"
        />
        {errors.clinicLocation && (
          <p className="text-red-500 text-sm">
            {errors.clinicLocation.message}
          </p>
        )}
      </div>

      <div>
        <label className="block">Speciality *</label>
        <input
          {...register("speciality", {
            required: "Speciality is required",
          })}
          className="w-full border px-2 py-1 rounded"
          placeholder="Neurologist"
        />
        {errors.speciality && (
          <p className="text-red-500 text-sm">{errors.speciality.message}</p>
        )}
      </div>

      {/* Mode Selection */}
      <div className="col-span-full">
        <label className="inline-flex items-center mr-4">
          <input
            type="checkbox"
            value="online"
            {...register("mode", {
              validate: (v) =>
                (v && v.length > 0) || "Select at least one mode",
            })}
          />
          <span className="ml-2">Online Consult</span>
        </label>
        <label className="inline-flex items-center">
          <input type="checkbox" value="physical" {...register("mode")} />
          <span className="ml-2">Physical Visit</span>
        </label>
        {errors.mode && (
          <p className="text-red-500 text-sm">{errors.mode.message}</p>
        )}
      </div>

      {/* Conditional Fees Inputs */}
      {onlineSelected && (
        <div>
          <label className="block">Online Fees *</label>
          <input
            type="number"
            {...register("onlineFees", {
              required: "Online fee is required",
              valueAsNumber: true,
              min: { value: 100, message: "Min ₹100" },
            })}
            className="w-full border px-2 py-1 rounded"
          />
          {errors.onlineFees && (
            <p className="text-red-500 text-sm">{errors.onlineFees.message}</p>
          )}
        </div>
      )}

      {physicalSelected && (
        <div>
          <label className="block">Physical Visit Fees *</label>
          <input
            type="number"
            {...register("consultFees", {
              required: "Physical fee is required",
              valueAsNumber: true,
              min: { value: 100, message: "Min ₹100" },
            })}
            className="w-full border px-2 py-1 rounded"
          />
          {errors.consultFees && (
            <p className="text-red-500 text-sm">{errors.consultFees.message}</p>
          )}
        </div>
      )}

      <div className="col-span-full">
        <label className="block">About *</label>
        <textarea
          {...register("about", { required: "About is required" })}
          className="w-full border px-2 py-1 rounded"
          rows={3}
          placeholder="Dr. John is GOOD, ..."
        ></textarea>
        {errors.about && (
          <p className="text-red-500 text-sm">{errors.about.message}</p>
        )}
      </div>

      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            {...register("isAvailable")}
            className="mr-2"
          />
          Currently Available
        </label>
      </div>

      <div>
        <label className="block">Gender *</label>
        <select
          {...register("gender", { required: "Gender is required" })}
          className="w-full border px-2 py-1 rounded"
        >
          <option value="">Select gender</option>
          <option value="men">Male</option>
          <option value="women">Female</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}
      </div>

      <div className="col-span-full flex justify-end space-x-2 mt-4">
        <Button type="submit">Save Doctor</Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            reset();
            onClose();
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
