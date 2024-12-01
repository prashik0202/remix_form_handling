import { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import { SignupSchema } from "~/utils/schema";
import { countryStateCity } from "~/utils/contant";
import TextField from "components/TextField";
import SelectField from "components/SelectField";
import ErrorDisplay from "components/ErrorDisplay";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const result = SignupSchema.safeParse(data);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { errors };
  }

  return redirect("/dashboard");
}

export default function Signup() {
  const actionData = useActionData<typeof action>();
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedState("");
    setCities([]);
    setStates(country ? Object.keys(countryStateCity[country]?.states || {}) : []);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value;
    setSelectedState(state);
    setCities(state ? countryStateCity[selectedCountry]?.states[state] || [] : []);
  };

  return (
    <div className="p-10 flex justify-center">
      <Form method="post" className="flex flex-col gap-2 w-full md:w-1/2">
        {/* Email Field */}
        <div className="flex flex-col gap-1">
          <TextField type="email" name="email" placeholder="email" error={actionData?.errors?.email} />
          <ErrorDisplay error={actionData?.errors?.email}/>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1">
          <TextField type="password" name="password" placeholder="password" error={actionData?.errors?.password} />
          <ErrorDisplay error={actionData?.errors?.password}/>
        </div>

         <div className="flex flex-col gap-1">
          <TextField 
            type="text"
            name="phone"
            placeholder="phone"
            maxLength={10}
            error={actionData?.errors?.phone}
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ""); // Allow only numbers
            }}
          />
          <ErrorDisplay error={actionData?.errors?.phone}/>
        </div>

        {/* Country Dropdown */}
        <div className="flex flex-col gap-1">
          <SelectField 
            name="country"
            error={actionData?.errors?.country}
            onChangeHandle={handleCountryChange}
            options={Object.keys(countryStateCity)}
            defaultPlacholder="Select Country"
          />
          <ErrorDisplay error={actionData?.errors?.country}/>
        </div>

        <div className="grid grid-cols-2 gap-2">

          {/* State Dropdown */}
          <div className="flex flex-col gap-1">
            <SelectField 
              name="state"
              error={actionData?.errors?.state}
              onChangeHandle={handleStateChange}
              disabled={!selectedCountry}
              options={states}
              defaultPlacholder="Select State"
            />
            <ErrorDisplay error={actionData?.errors?.state}/>
          </div>

          {/* City Dropdown */}
          <div className="flex flex-col gap-1">
            <SelectField 
              name="city"
              error={actionData?.errors?.city}
              disabled={!selectedState}
              options={cities}
              defaultPlacholder="Select City"
            />
            <ErrorDisplay error={actionData?.errors?.city}/>
          </div>

        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-sky-600 p-2 rounded-md text-white hover:bg-sky-700">
          Sign Up
        </button>
      </Form>
    </div>
  );
}
