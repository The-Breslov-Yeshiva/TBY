"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type FieldName = string;
type FieldType = "text" | "email" | "select" | "textarea";
type ApplicationField = readonly [name: FieldName, label: string, type: FieldType, required: boolean];
type ApplicationStep = {
  readonly title: string;
  readonly fields: readonly ApplicationField[];
};

const steps: readonly ApplicationStep[] = [
  {
    title: "Personal Information",
    fields: [
      ["firstName", "First Name", "text", true],
      ["lastName", "Last Name", "text", true],
      ["email", "Email Address", "email", true],
      ["age", "Age Range", "select", false]
    ]
  },
  {
    title: "Jewish Background",
    fields: [
      ["jewishBackground", "Jewish Background", "textarea", false],
      ["learningDuration", "Torah learning experience", "textarea", false]
    ]
  },
  {
    title: "Torah Learning Experience",
    fields: [
      ["gemaraLevel", "Current Gemara level", "textarea", false],
      ["torahInterests", "Areas of Torah study that interest you", "textarea", false]
    ]
  },
  {
    title: "Breslov Connection",
    fields: [
      ["breslovDiscovery", "How did you discover Rebbe Nachman's teachings?", "textarea", false],
      ["breslovAspects", "Which Breslov ideas resonate with you?", "textarea", false]
    ]
  },
  {
    title: "Goals & Commitment",
    fields: [
      ["yeshivaGoals", "Your goals for joining the yeshiva", "textarea", false],
      ["timeCommitment", "Daily learning commitment", "textarea", false]
    ]
  },
  {
    title: "Additional Information",
    fields: [
      ["challenges", "Questions, challenges, or concerns", "textarea", false],
      ["spiritualJourney", "Personal spiritual journey", "textarea", false],
      ["howHeard", "How did you hear about us?", "textarea", false]
    ]
  }
];

const allFields = steps.flatMap((stepItem) => stepItem.fields);

type FormValues = Record<FieldName, string>;

const initialFormValues = Object.fromEntries(allFields.map(([name]) => [name, ""])) as FormValues;

export function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<FormValues>(initialFormValues);
  const [error, setError] = useState("");
  const progress = ((step + 1) / steps.length) * 100;
  const current = steps[step];
  const currentFieldNames = new Set<FieldName>(current.fields.map(([name]) => name));

  function updateValue(name: FieldName, value: string) {
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setError("");
  }

  function validateStep(targetStep = step) {
    const stepFields = steps[targetStep].fields;
    const missingField = stepFields.find(([name, , , required]) => required && !values[name].trim());

    if (!missingField) {
      return true;
    }

    setError(`${missingField[1]} is required before continuing.`);
    return false;
  }

  function goNext() {
    if (!validateStep()) {
      return;
    }

    setStep((value) => Math.min(steps.length - 1, value + 1));
  }

  function goPrevious() {
    setError("");
    setStep((value) => Math.max(0, value - 1));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const firstMissing = allFields.find(([name, , , required]) => required && !values[name].trim());

    if (!firstMissing) {
      return;
    }

    event.preventDefault();
    const missingStep = steps.findIndex((stepItem) => stepItem.fields.some(([name]) => name === firstMissing[0]));
    setStep(Math.max(0, missingStep));
    setError(`${firstMissing[1]} is required before submitting.`);
  }

  return (
    <form action={site.forms.action} method="POST" onSubmit={handleSubmit} className="premium-card rounded-2xl p-5 sm:rounded-3xl sm:p-8">
      <input type="hidden" name="_subject" value="Student application" />
      <input type="hidden" name="_next" value={site.forms.receivedUrl} />
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {allFields
        .filter(([name]) => !currentFieldNames.has(name))
        .map(([name]) => (
          <input key={name} type="hidden" name={name} value={values[name]} />
        ))}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-gray-400">
          <span>Progress</span>
          <span>Step {step + 1} of {steps.length}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-800">
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <h2 className="mb-6 text-2xl font-black text-white">{current.title}</h2>
      {error ? (
        <p className="mb-5 rounded-xl border border-amber-300/25 bg-amber-300/10 px-4 py-3 text-sm font-bold text-amber-100" role="alert">
          {error}
        </p>
      ) : null}
      <div className="space-y-6">
        {current.fields.map(([name, label, type, required]) => (
          <Field key={name} name={name} label={label} type={type} required={required} value={values[name]} onChange={(value) => updateValue(name, value)} />
        ))}
      </div>

      <div className="mt-8 grid gap-3 border-t border-white/15 pt-6 sm:flex sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={goPrevious}
          className={cn("rounded-xl px-6 py-3 font-bold transition", step === 0 ? "cursor-not-allowed text-gray-500" : "bg-white/6 text-gray-300 hover:text-white sm:bg-transparent")}
          disabled={step === 0}
        >
          Previous
        </button>
        {step < steps.length - 1 ? (
          <button type="button" onClick={goNext} className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 font-bold text-white transition hover:from-indigo-500 hover:to-purple-500">
            Next
          </button>
        ) : (
          <button type="submit" className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-3 font-bold text-white transition hover:from-green-500 hover:to-emerald-500">
            Submit Application
          </button>
        )}
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type,
  required,
  value,
  onChange
}: {
  name: FieldName;
  label: string;
  type: FieldType;
  required: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  if (type === "textarea") {
    return (
      <div>
        <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-300">{label}</label>
        <textarea id={name} name={name} rows={4} required={required} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400" />
      </div>
    );
  }

  if (type === "select") {
    return (
      <div>
        <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-300">{label}</label>
        <select id={name} name={name} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-white/20 bg-gray-950 px-4 py-3 text-white">
          <option value="">Select one</option>
          <option value="18-20">18-20</option>
          <option value="21-25">21-25</option>
          <option value="26-30">26-30</option>
          <option value="31-35">31-35</option>
          <option value="36+">36+</option>
        </select>
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-300">{label}</label>
      <input id={name} name={name} type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400" />
    </div>
  );
}
