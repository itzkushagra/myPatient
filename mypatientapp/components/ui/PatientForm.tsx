"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomForm from "./ui/CustomForm"
import SubmitButton from "./ui/SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton',
}


 
//const formSchema = z.object({
  //username: z.string().min(2, {
    //message: "Username must be at least 2 characters.",
  //}),
//})

const PatientForm = () => {
  const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const user = {name, email, phone}
      if(user) router.push('/patients/${user.$id}/register')
    } catch (error) {
      console.log(error);
      
    }
  }
    return(
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
            <section className="mb-12 space-y-4">
                <h1 className="header">Hi There</h1>
                <p className="text-dark-700">Schedule your first appointment</p>
            </section>
            <CustomForm
                fieldType={FormFieldType.INPUT}
                name="name"
                label="Full name"
                placeholder="John Doe"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
                control = {form.control}
            />
            <CustomForm
                fieldType={FormFieldType.INPUT}
                name="email"
                label="Email"
                placeholder="johndoe@email.com"
                iconSrc="/assets/icons/email.svg"
                iconAlt="email"
                control = {form.control}
            />
            <CustomForm
                fieldType={FormFieldType.PHONE_INPUT}
                name="phone"
                label="Phone Number"
                placeholder="1234567890"
                control = {form.control}
            />

          <SubmitButton isLoading = {isLoading}>Get Started</SubmitButton>
        </form>
      </Form>
    )
};

export default PatientForm