import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Select, DatePicker, Upload, ConfigProvider } from "antd";
import { PiGraduationCap } from "react-icons/pi";
import { FiTrash2, FiUpload } from "react-icons/fi";

import "dayjs/locale/en";
import { LuBadge } from "react-icons/lu";
import { IoAddCircleOutline, IoDocumentOutline } from "react-icons/io5";
import { GiInjustice } from "react-icons/gi";
import dayjs from "dayjs";
import { indianStates } from "../utils/constants";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const { Dragger } = Upload;

const schema = yup.object().shape({
  qualifications: yup.object().shape({
    degreeType: yup.string().required("Degree type is required"),
    institutionName: yup.string().required("Institution name is required"),
    graduationYear: yup.string().required("Graduation year is required"),
    degreeDocument: yup
      .mixed()
      .required("Degree document is required")
      .test("fileSize", "File is too large", (value) => {
        return value && value?.size <= 5 * 1024 * 1024;
      })
      .test("fileType", "Unsupported file format", (value) => {
        return (
          value &&
          ["application/pdf", "image/jpeg", "image/png"].includes(value?.type)
        );
      }),
  }),

  certifications: yup.array().of(
    yup.object().shape({
      certificationName: yup
        .string()
        .required("Certification name is required"),
      issuingBody: yup.string().required("Issuing body is required"),
      certificationDate: yup
        .date()
        .typeError("Please enter a valid certification date")
        .required("Certification date is required"),
      certificateDocument: yup
        .mixed()
        .required("Degree document is required")
        .test("fileSize", "File is too large", (value) => {
          return value && value?.size <= 5 * 1024 * 1024;
        })
        .test("fileType", "Unsupported file format", (value) => {
          return (
            value &&
            ["application/pdf", "image/jpeg", "image/png"].includes(value?.type)
          );
        }),
    })
  ),

  barRegistrations: yup.object().shape({
    barAssociation: yup.string().required("Bar Association is required"),
    licenseNumber: yup.string().required("License number is required"),
    jurisdiction: yup.string().required("Jurisdiction is required"),
    completionYear: yup.string().required("Completion year is required"),
    proofDocument: yup
      .mixed()
      .required("Degree document is required")
      .test("fileSize", "File is too large", (value) => {
        return value && value?.size <= 5 * 1024 * 1024;
      })
      .test("fileType", "Unsupported file format", (value) => {
        return (
          value &&
          ["application/pdf", "image/jpeg", "image/png"].includes(value?.type)
        );
      }),
  }),
});

const ProfessionalQualificationsForm = ({
  onStepSubmit,
  current,
  setCurrent,
  steps,
  formData,
}) => {
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData?.professionalQualifications || {
      qualifications: {
        degreeType: "",
        institutionName: "",
        graduationYear: "",
        degreeDocument: null,
      },
      certifications: [
        {
          certificationName: "",
          issuingBody: "",
          certificationDate: "",
          certificateDocument: null,
        },
      ],
      barRegistrations: {
        barAssociation: "",
        licenseNumber: "",
        jurisdiction: "",
        completionYear: "",
        proofDocument: null,
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 101 }, (_, i) => {
    const year = (currentYear - i).toString();
    return { value: year, label: year };
  });

  const onSubmit = (data) => {
    console.log(data);
    onStepSubmit(data);
    setCurrent((prev) => prev + 1);
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-semibold text-dark-night mt-16">
        Professional Details
      </h2>
      <p className="text-gray-600 mt-1.5">
        Tell us about your qualifications so we can connect you with our
        clients.
      </p>

      {/* Form Container */}
      <div className=" mt-5  min-h-full">
        {/* Form Sections */}
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Poppins",
              colorPrimary: "#00212B",
              colorError: "#f05252",
            },
            Select: {
              colorPrimary: "#000",
            },
          }}
        >
          <div className="mt-5 space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <div className="bg-white rounded-md p-5 shadow flex flex-col gap-y-24 text-dark-night md:py-10 lg:px-16 xl:py-14 ">
                {/* Qualifications Section*/}
                <div>
                  {/* Heading */}
                  <div className="flex items-start gap-4 mb-10">
                    <div className="bg-gray-100 text-white p-4  rounded-sm">
                      <PiGraduationCap
                        size={24}
                        className="text-dark-night font-semibold"
                      />
                    </div>
                    <div className="flex flex-col mt-0.5">
                      <h2 className="text-lg font-semibold font-poppins">
                        Qualifications *
                      </h2>
                      <p className="text-sm text-gray-600 font-poppins">
                        Your educational background and degree
                      </p>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-9 gap-5 sm:gap-7">
                    {/* Degree Type */}
                    <div className="col-span-9 ">
                      <label className="block mb-1">Degree Type</label>
                      <Controller
                        control={control}
                        name="qualifications.degreeType"
                        render={({ field }) => (
                          <Select
                            {...field}
                            size="large"
                            placeholder="Select degree type"
                            className="w-full "
                            options={[
                              { value: "bachelor", label: "Bachelor" },
                              { value: "master", label: "Master" },
                              { value: "phd", label: "PhD" },
                            ]}
                          />
                        )}
                      />
                      {errors.qualifications?.degreeType && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.qualifications.degreeType.message}
                        </p>
                      )}
                    </div>

                    {/* Institution Name */}
                    <div className=" col-span-9 sm:col-span-4">
                      <label className="block mb-1">Institution Name</label>
                      <Controller
                        control={control}
                        name="qualifications.institutionName"
                        render={({ field }) => (
                          <Input
                            {...field}
                            size="large"
                            placeholder="e.g. Harvard Law School"
                          />
                        )}
                      />
                      {errors.qualifications?.institutionName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.qualifications.institutionName.message}
                        </p>
                      )}
                    </div>

                    <div className="hidden sm:block col-span-1"></div>

                    {/* Graduation Year */}
                    <div className=" col-span-9 sm:col-span-4">
                      <label className="block mb-1">Graduation Year</label>
                      <Controller
                        control={control}
                        name="qualifications.graduationYear"
                        placeholder="Select year"
                        render={({ field }) => (
                          <Select
                            {...field}
                            size="large"
                            placeholder="Select year"
                            className="w-full "
                            options={years}
                          />
                        )}
                      />
                      {errors.qualifications?.graduationYear && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.qualifications.graduationYear.message}
                        </p>
                      )}
                    </div>

                    {/* File Upload */}
                    <div className="col-span-9">
                      <label className="block mb-2">Degree Document</label>
                      <Controller
                        control={control}
                        name="qualifications.degreeDocument"
                        render={({ field: { onChange } }) => (
                          <Dragger
                            accept=".pdf,.jpg,.jpeg,.png"
                            maxCount={1}
                            beforeUpload={() => false}
                            onChange={(info) =>
                              onChange(info.fileList[0]?.originFileObj)
                            }
                            className="p-0"
                          >
                            <div className="space-y-6">
                              <div className="flex flex-col items-center justify-center py-6 gap-2 h-full">
                                <FiUpload className="text-dark-night text-4xl sm:text-5xl" />
                                <span className="font-poppins">
                                  Drag and drop your document
                                </span>
                                <span className="text-gray-500 text-sm font-poppins">
                                  or click to browse files
                                </span>
                              </div>
                              <div className="flex gap-2 items-center text-gray-600 text-[12px] sm:text-base">
                                <IoDocumentOutline size={18} />
                                <p>PDF, JPG or PNG (max. 5MB)</p>
                              </div>
                            </div>
                          </Dragger>
                        )}
                      />
                      {errors.qualifications?.degreeDocument && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.qualifications.degreeDocument.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Certifications Section */}
                <div>
                  <div className="flex items-start gap-4 mb-10">
                    <div className="bg-gray-200 text-white p-4 rounded-sm">
                      <LuBadge
                        size={24}
                        className="text-dark-night font-semibold"
                      />
                    </div>
                    <div className="flex flex-col mt-0.5">
                      <h2 className="text-lg text-dark-night font-semibold font-poppins">
                        Certifications
                      </h2>
                      <p className="text-sm text-gray-600 font-poppins">
                        Add your professional certifications
                      </p>
                    </div>
                  </div>

                  {/* Field Array Hook */}
                  {
                    <div className="space-y-10">
                      {fields.map((item, index) => (
                        <div
                          key={item.id}
                          className="grid grid-cols-9 gap-5 sm:gap-7"
                        >
                          {/* Certification Name */}
                          <div className="col-span-9 sm:col-span-4">
                            <label className="block mb-1">
                              Certification Name
                            </label>
                            <Controller
                              control={control}
                              name={`certifications[${index}].certificationName`}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  placeholder="e.g. Certified Privacy Professional"
                                  size="large"
                                />
                              )}
                            />
                            {errors.certifications?.[index]
                              ?.certificationName && (
                              <p className="text-red-500 text-sm mt-1">
                                {
                                  errors.certifications[index].certificationName
                                    .message
                                }
                              </p>
                            )}
                          </div>

                          <div className="hidden sm:block col-span-1"></div>

                          {/* Issuing Body */}
                          <div className="col-span-9 sm:col-span-4">
                            <label className="block mb-1">Issuing Body</label>
                            <Controller
                              control={control}
                              name={`certifications[${index}].issuingBody`}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  placeholder="e.g. International Association of Privacy Professionals"
                                  size="large"
                                />
                              )}
                            />
                            {errors.certifications?.[index]?.issuingBody && (
                              <p className="text-red-500 text-sm mt-1">
                                {
                                  errors.certifications[index].issuingBody
                                    .message
                                }
                              </p>
                            )}
                          </div>

                          {/* Certification Date */}
                          <div className="col-span-9 sm:col-span-4">
                            <label className="block mb-1">
                              Certification Date
                            </label>
                            <Controller
                              control={control}
                              name={`certifications[${index}].certificationDate`}
                              render={({ field }) => (
                                <DatePicker
                                  {...field}
                                  size="large"
                                  value={
                                    field.value ? dayjs(field.value) : null
                                  }
                                  className="w-full"
                                  format="YYYY-MM-DD"
                                  // onChange={(date, dateString) =>
                                  //   field.onChange(dateString)
                                  // }
                                />
                              )}
                            />
                            {errors.certifications?.[index]
                              ?.certificationDate && (
                              <p className="text-red-500 text-sm mt-1">
                                {
                                  errors.certifications[index].certificationDate
                                    .message
                                }
                              </p>
                            )}
                          </div>

                          {/* Certificate Document Upload */}
                          <div className="col-span-9">
                            <label className="block mb-1">
                              Certificate Document
                            </label>
                            <Controller
                              control={control}
                              name={`certifications[${index}].certificateDocument`}
                              render={({ field: { onChange } }) => (
                                <Dragger
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  maxCount={1}
                                  beforeUpload={() => false}
                                  onChange={(info) =>
                                    onChange(info.fileList[0]?.originFileObj)
                                  }
                                  className=""
                                >
                                  <div className="space-y-6">
                                    <div className="flex flex-col items-center justify-center py-6 gap-2 h-full">
                                      <FiUpload className="text-dark-night text-4xl sm:text-5xl" />
                                      <span className="font-poppins">
                                        Drag and drop your document
                                      </span>
                                      <span className="text-gray-500 text-sm font-poppins">
                                        or click to browse files
                                      </span>
                                    </div>
                                    <div className="flex gap-2 items-center text-gray-600 text-[12px] sm:text-base">
                                      <IoDocumentOutline size={18} />
                                      <p>PDF, JPG or PNG (max. 5MB)</p>
                                    </div>
                                  </div>
                                </Dragger>
                              )}
                            />
                            {errors.certifications?.[index]
                              ?.certificateDocument && (
                              <p className="text-red-500 text-sm mt-1">
                                {
                                  errors.certifications[index]
                                    .certificateDocument.message
                                }
                              </p>
                            )}

                            <div className="mt-2 flex justify-between items-center col-span-9">
                              {/* Add More  */}
                              <button
                                type="button"
                                className="flex gap-1 items-center justify-center text-sm font-medium text-dark-night"
                                onClick={() =>
                                  append({
                                    certificationName: "",
                                    issuingBody: "",
                                    certificationDate: "",
                                    certificateDocument: [],
                                  })
                                }
                              >
                                <IoAddCircleOutline size={20} /> Add another
                                certification
                              </button>

                              {/* Remove */}
                              <button
                                type="button"
                                className="text-red-500 text-sm flex gap-1 items-center justify-center"
                                onClick={() => remove(index)}
                              >
                                <FiTrash2 /> Remove Certification
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  }
                </div>

                {/* Bar Association Registration Section */}
                <div>
                  {/* Heading */}
                  <div className="flex items-start gap-4 mb-10">
                    <div className="bg-gray-100 text-white p-4 rounded-sm">
                      <GiInjustice
                        size={24}
                        className="text-dark-night font-semibold"
                      />
                    </div>
                    <div className="flex flex-col mt-0.5 font-poppins">
                      <h2 className="text-lg font-semibold ">
                        Bar Association Registration
                      </h2>
                      <p className="text-sm text-gray-600 ">
                        Your professional licensing information
                      </p>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-9 gap-5 sm:gap-7">
                    {/* Bar Association */}
                    <div className="col-span-9 sm:col-span-4">
                      <label className="block mb-1">Bar Association</label>
                      <Controller
                        control={control}
                        name="barRegistrations.barAssociation"
                        render={({ field }) => (
                          <Select
                            {...field}
                            size="large"
                            placeholder="Select bar association"
                            className="w-full"
                            options={[
                              {
                                value: "ABA",
                                label: "American Bar Association",
                              },
                              { value: "SBA", label: "State Bar Association" },
                            ]}
                          />
                        )}
                      />
                      {errors.barRegistrations?.barAssociation && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.barRegistrations.barAssociation.message}
                        </p>
                      )}
                    </div>

                    <div className="hidden sm:block col-span-1"></div>

                    {/* License / Bar Number */}
                    <div className="col-span-9 sm:col-span-4">
                      <label className="block mb-1">License/Bar Number</label>
                      <Controller
                        control={control}
                        name="barRegistrations.licenseNumber"
                        render={({ field }) => (
                          <Input
                            {...field}
                            size="large"
                            placeholder="e.g. CA123456"
                            className="w-full"
                          />
                        )}
                      />
                      {errors.barRegistrations?.licenseNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.barRegistrations.licenseNumber.message}
                        </p>
                      )}
                    </div>

                    {/* Jurisdiction / State */}
                    <div className="col-span-9 sm:col-span-4">
                      <label className="block mb-1">Jurisdiction / State</label>
                      <Controller
                        control={control}
                        name="barRegistrations.jurisdiction"
                        render={({ field }) => (
                          <Select
                            {...field}
                            size="large"
                            placeholder="Select State"
                            className="w-full"
                            options={indianStates}
                          />
                        )}
                      />
                      {errors.barRegistrations?.jurisdiction && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.barRegistrations.jurisdiction.message}
                        </p>
                      )}
                    </div>

                    <div className="hidden sm:block col-span-1"></div>

                    {/* Completion Year */}
                    <div className="col-span-9 sm:col-span-4">
                      <label className="block mb-1">Completion Year</label>
                      <Controller
                        control={control}
                        name="barRegistrations.completionYear"
                        render={({ field }) => (
                          <Select
                            {...field}
                            size="large"
                            placeholder="Select year"
                            className="w-full"
                            options={years}
                          />
                        )}
                      />
                      {errors.barRegistrations?.completionYear && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.barRegistrations.completionYear.message}
                        </p>
                      )}
                    </div>

                    {/* Proof Document Upload */}
                    <div className="col-span-9">
                      <label className="block mb-2">Proof Document</label>
                      <Controller
                        control={control}
                        name="barRegistrations.proofDocument"
                        render={({ field: { onChange } }) => (
                          <Dragger
                            accept=".pdf,.jpg,.jpeg,.png"
                            maxCount={1}
                            beforeUpload={() => false}
                            onChange={(info) =>
                              onChange(info.fileList[0]?.originFileObj)
                            }
                            className="p-0 "
                          >
                            <div className="space-y-6">
                              <div className="flex flex-col items-center justify-center py-6 gap-2 h-full">
                                <FiUpload className="text-dark-night text-4xl sm:text-5xl" />
                                <span className="font-poppins">
                                  Drag and drop your document
                                </span>
                                <span className="text-gray-500 text-sm font-poppins">
                                  or click to browse files
                                </span>
                              </div>
                              <div className="flex gap-2 items-center text-gray-600 text-[12px] sm:text-base">
                                <IoDocumentOutline size={18} />
                                <p>PDF, JPG or PNG (max. 5MB)</p>
                              </div>
                            </div>
                          </Dragger>
                        )}
                      />
                      {errors.barRegistrations?.proofDocument && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.barRegistrations.proofDocument.message}
                        </p>
                      )}

                      <p className="mt-2 flex justify-center items-center gap-2 text-green-400 text-sm w-fit">
                        <IoMdCheckmarkCircleOutline size={18} /> Document will
                        be verified within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-10 gap-5">
                {/* Save Draft */}
                <button
                  className="px-5 py-2 rounded border border-gray-400 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    localStorage.setItem(
                      "multiStepFormData",
                      JSON.stringify(formData)
                    );
                    alert("Draft saved!");
                  }}
                >
                  Save Draft
                </button>

                {/* Skip + Continue */}
                <div className="flex gap-4">
                  <button
                    className="px-5 py-2 rounded border border-gray-300 text-gray-500 hover:bg-gray-100"
                    onClick={() =>
                      setCurrent((prev) =>
                        prev + 1 < steps.length ? prev + 1 : prev
                      )
                    }
                    disabled={current >= steps.length - 1}
                  >
                    Skip
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded bg-dark-night text-white hover:bg-gray-900"
                    disabled={current >= steps.length - 1}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </form>
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default ProfessionalQualificationsForm;
