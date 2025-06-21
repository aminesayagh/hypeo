"use client";

import { Card, CardBody, CardFooter } from "@/components/card";
import { Text } from "@/components/text";
import { Form } from "@/components/form";
import { useForm } from "react-hook-form";

export default function NewAiCampaignPage() {
  // --------------------------------------------------
  // Header
  // --------------------------------------------------

  const header_markup = (
    <div className='flex flex-col items-center justify-center gap-4'>
      <Text variant='heading2xl' degree='100' className='text-center'>What are you working on?</Text>
    </div>
  )

  // --------------------------------------------------
  // Chat Block
  // --------------------------------------------------

  const chatBlock_markup = (
    <Card className='max-w-screen-lg bg-background-level-1 w-full h-full'>
      <CardBody>

      </CardBody>
      <CardFooter className='flex flex-row items-center justify-between'>
        
      </CardFooter>
    </Card>
  )

  const chatBlock = {
    markup: chatBlock_markup,
  };

  return (
    <section className='flex flex-col items-center justify-center gap-12 p-12 h-full w-full'>
      {header_markup}
      {chatBlock.markup}
    </section>
  );
}