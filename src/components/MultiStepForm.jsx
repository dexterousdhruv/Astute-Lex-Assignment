import { useEffect, useState } from "react";
import { ConfigProvider, Steps } from "antd";
import useMediaQuery from "../hooks/useMediaQuery";
import ProfessionalQualificationsForm from "./ProfessionalQualificationsForm";

const steps = [
  { title: "Basic Details" },
  { title: "Professional Details" },
  { title: "Experience" },
  { title: "Identity Verification" },
  { title: "Verification Status" },
];

export default function MultiStepForm() {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});
  const isAboveSmScreens = useMediaQuery("(min-width: 700px)");

  const updateFormData = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    setCurrent((prev) => prev + 1);
  };

  const renderStepContent = () => {
    switch (current) {
      case 0:
        return (
          <div className="mt-10">
            <p className="text-center text-2xl py-16">
              Basic Details Form goes here
            </p>
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
                  onClick={() =>
                    setCurrent((prev) =>
                      prev + 1 < steps.length ? prev + 1 : prev
                    )
                  }
                  disabled={current >= steps.length - 1}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <ProfessionalQualificationsForm
            onStepSubmit={(data) =>
              updateFormData({ professionalQualifications: data })
            }
            current={current}
            formData={formData}
            setCurrent={setCurrent}
            steps={steps}
          />
        );

      case 2:
        return (
          <div className="mt-10">
            <p className="text-center text-2xl py-16">
              Experience Form goes here
            </p>
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
                  onClick={() =>
                    setCurrent((prev) =>
                      prev + 1 < steps.length ? prev + 1 : prev
                    )
                  }
                  disabled={current >= steps.length - 1}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="mt-10">
            <p className="text-center text-2xl py-16">
              Identity Verification Step
            </p>
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
                  onClick={() =>
                    setCurrent((prev) =>
                      prev + 1 < steps.length ? prev + 1 : prev
                    )
                  }
                  disabled={current >= steps.length - 1}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="mt-10">
            <p className="text-xl font-semibold mb-4">You're all set! 🎉</p>
            <pre className="bg-white p-4 rounded text-sm overflow-auto max-h-96">
              {JSON.stringify(formData, null, 2)}
            </pre>
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
                  onClick={() =>
                    setCurrent((prev) =>
                      prev + 1 < steps.length ? prev + 1 : prev
                    )
                  }
                  disabled={current >= steps.length - 1}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem("multiStepFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center sm:p-5 font-poppins">
      <div className="max-w-7xl w-full p-5 rounded-md">
        <h1 className="text-3xl font-bold text-gray-900">LeXi Ai</h1>

        <div className="mt-5">
          <ConfigProvider
            theme={{
              token: {
                fontFamily: "Poppins",
                colorPrimaryBg: "#7bf1a8",
                colorPrimaryText: "#000",
              },
              components: {
                Steps: {
                  iconSize: isAboveSmScreens ? 48 : 36,
                  iconFontSize: isAboveSmScreens ? 20 : 15,
                  colorPrimary: "#00212B",
                  colorPrimaryText: "#fff",
                },
              },
            }}
          >
            <Steps
              current={current}
              direction={isAboveSmScreens ? "horizontal" : "vertical"}
              labelPlacement="vertical"
              responsive
              className="w-full font-poppins text-white font-medium"
              items={steps}
            />
          </ConfigProvider>
        </div>

        {renderStepContent()}

      </div>
    </div>
  );
}
