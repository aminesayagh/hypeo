import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { PlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Negociation() {
    const t = useTranslations('pages.campaign.negociation')

    const header_markup = (
        <div className='flex flex-row items-center justify-between'>
            <Text preset='modalTitle'>
                {t('title')}
            </Text>
            <div className='flex flex-row gap-2'>
                <Button color='primary' endContent={<PlusIcon className='size-4' />}>
                    {t('actions.add')}
                </Button>
            </div>
        </div>
    )   

    const header = {
        markup: header_markup,
    }

    return (
        <div className='mb-20 flex flex-col gap-4'>
            {header.markup}
        </div>
    );
}