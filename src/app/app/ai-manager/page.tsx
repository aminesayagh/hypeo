"use client";

import { Text } from "@/components/typo";
import { useTranslations } from "next-intl";
import { Card, CardBody, CardHeader } from "@/components/card";
import { Avatar, AvatarGroup } from "@/components/avatar";

export default function AiManagerPage() {
  const t = useTranslations('pages.aiManager')

  // --------------------------------------------------
  // Data
  // --------------------------------------------------
  const DATA = {
    "campaigns": [
      {
        "id": 1,
        "brand": {
          "name": "Hyundai",
          "logo": "https://hypeo-prod.vercel.app/_next/image?url=%2Ffake%2Fhyundai.png&w=96&q=75"
        },
        "title": "Lancement du Nouveau Tucson 2025",
        "influencers": [
          {
            "id": 1,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/177962118.jpg",
            "position": "first"
          },
          {
            "id": 2,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/5385827988.jpg",
            "position": "overlapping"
          },
          {
            "id": 3,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/4234044224.jpg",
            "position": "overlapping"
          },
          {
            "id": 4,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/584266241.jpg",
            "position": "overlapping"
          },
          {
            "id": 5,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/26229564712.jpg",
            "position": "overlapping"
          }
        ],
        "viewLink": "/en/ai-manager/lancement-du-nouveau-tucson-2025",
        "slug": "lancement-du-nouveau-tucson-2025"
      },
      {
        "id": 2,
        "brand": {
          "name": "Garnier",
          "logo": "https://hypeo-prod.vercel.app/_next/image?url=%2Ffake%2Fgarnier.png&w=96&q=75"
        },
        "title": "Beauté Naturelle - Gamme Éclat 2025",
        "influencers": [
          {
            "id": 1,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/13542465641.jpg",
            "position": "first"
          },
          {
            "id": 2,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/1711825454.jpg",
            "position": "overlapping"
          },
          {
            "id": 3,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/1576569817.jpg",
            "position": "overlapping"
          },
          {
            "id": 4,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/1393620702.jpg",
            "position": "overlapping"
          },
          {
            "id": 5,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/44499995501.jpg",
            "position": "overlapping"
          }
        ],
        "viewLink": "/en/ai-manager/beaute-naturelle-gamme-eclat-2025",
        "slug": "beaute-naturelle-gamme-eclat-2025"
      },
      {
        "id": 3,
        "brand": {
          "name": "Signal",
          "logo": "https://hypeo-prod.vercel.app/_next/image?url=%2Ffake%2Fsignal.png&w=96&q=75"
        },
        "title": "Sourire Parfait - Challenge Santé Dentaire",
        "influencers": [
          {
            "id": 1,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/yt/UCBbzyfqcxSepDwli-iuCBcw.jpg",
            "position": "first",
            "platform": "youtube"
          },
          {
            "id": 2,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/4309331207.jpg",
            "position": "overlapping"
          },
          {
            "id": 3,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/6751253733.jpg",
            "position": "overlapping"
          },
          {
            "id": 4,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/tt/6775167343092237314.jpg",
            "position": "overlapping",
            "platform": "tiktok"
          },
          {
            "id": 5,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/tt/6759145829170906118.jpg",
            "position": "overlapping",
            "platform": "tiktok"
          }
        ],
        "viewLink": "/en/ai-manager/sourire-parfait-challenge-sante-dentaire",
        "slug": "sourire-parfait-challenge-sante-dentaire"
      },
      {
        "id": 4,
        "brand": {
          "name": "Pampers",
          "logo": "https://hypeo-prod.vercel.app/_next/image?url=%2Ffake%2Fpampers.png&w=96&q=75"
        },
        "title": "Douceur et Protection pour Bébé",
        "influencers": [
          {
            "id": 1,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/2951128275.jpg",
            "position": "first"
          },
          {
            "id": 2,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/1517201113.jpg",
            "position": "overlapping"
          },
          {
            "id": 3,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/48044368627.jpg",
            "position": "overlapping"
          },
          {
            "id": 4,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/8193654618.jpg",
            "position": "overlapping"
          },
          {
            "id": 5,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/6222856231.jpg",
            "position": "overlapping"
          }
        ],
        "viewLink": "/en/ai-manager/douceur-et-protection-pour-bebe",
        "slug": "douceur-et-protection-pour-bebe"
      },
      {
        "id": 5,
        "brand": {
          "name": "Coca Cola",
          "logo": "https://hypeo-prod.vercel.app/_next/image?url=%2Ffake%2Fcoca-cola.png&w=96&q=75"
        },
        "title": "Moments de Partage Ramadan 2025",
        "influencers": [
          {
            "id": 1,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/7200512450.jpg",
            "position": "first"
          },
          {
            "id": 2,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/1357570597.jpg",
            "position": "overlapping"
          },
          {
            "id": 3,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/3902108628.jpg",
            "position": "overlapping"
          },
          {
            "id": 4,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/41859471294.jpg",
            "position": "overlapping"
          },
          {
            "id": 5,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/4172921796.jpg",
            "position": "overlapping"
          }
        ],
        "viewLink": "/en/ai-manager/moments-de-partage-ramadan-2025",
        "slug": "moments-de-partage-ramadan-2025"
      },
      {
        "id": 6,
        "brand": {
          "name": "Yassir",
          "logo": "https://hypeo-prod.vercel.app/_next/image?url=%2Ffake%2Fmarjane.png&w=96&q=75",
          "note": "Logo appears to be Marjane but alt text says Yassir"
        },
        "title": "Offres Ramadan - Promotions Spéciales",
        "influencers": [
          {
            "id": 1,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/yt/UCI14hkaiRn8cJl-bSZGmSuw.jpg",
            "position": "first",
            "platform": "youtube"
          },
          {
            "id": 2,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/3879970309.jpg",
            "position": "overlapping"
          },
          {
            "id": 3,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/5554486142.jpg",
            "position": "overlapping"
          },
          {
            "id": 4,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/679862356.jpg",
            "position": "overlapping"
          },
          {
            "id": 5,
            "avatar": "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/8434897242.jpg",
            "position": "overlapping"
          }
        ],
        "viewLink": "/en/ai-manager/offres-ramadan-promotions-speciales",
        "slug": "offres-ramadan-promotions-speciales"
      }
    ],
    "metadata": {
      "totalCampaigns": 6,
      "gridLayout": "3 columns",
      "extractedAt": "2025-01-24",
      "platforms": {
        "instagram": "Most influencers (identified by /in/ in URLs)",
        "youtube": "Some influencers (identified by /yt/ in URLs)",
        "tiktok": "Some influencers (identified by /tt/ in URLs)"
      }
    }
  };

  // --------------------------------------------------
  // Header
  // --------------------------------------------------

  const header_markup = (
    <div className='flex flex-row items-start justify-between'>
      <div className='flex flex-col gap-2'>
        <Text as='h1' preset='sectionTitle'>
          {t('title')}
        </Text>
        <Text variant='bodyMd' degree='300'>
          {t('description')}
        </Text>
      </div>
    </div>
  )

  const header = {
    markup: header_markup,
  }

  // --------------------------------------------------
  // Campaigns Grid
  // --------------------------------------------------

  const campaignsGrid_renderCard = (campaign: typeof DATA.campaigns[0]) => (
    <Card
      key={campaign.id}
      className='group flex border-1 border-default-100 flex-col gap-4 p-4 hover:shadow-md hover:transition-shadow hover:duration-300'
      isHoverable
      isPressable
      shadow='sm'
    >
      <CardHeader className='flex flex-row items-center justify-between gap-4 pb-2'>
        <div className='flex flex-row items-center gap-4'>
          <Avatar
            src={campaign.brand.logo}
            alt={campaign.brand.name}
            size='lg'
            radius='sm'
          />
          <div className='flex flex-col items-start gap-1'>
            <Text variant='headingSm' degree='100' className='font-medium'>
              {campaign.brand.name}
            </Text>
            <Text
              variant='bodySm'
              degree='100'
              className='line-clamp-2 font-medium'
            >
              {campaign.title}
            </Text>
          </div>
        </div>
      </CardHeader>

      <CardBody className='flex flex-col gap-4 pt-0'>
        <div className='flex flex-col gap-2'>
        </div>

        <div className='flex flex-row items-center justify-between'>
          <AvatarGroup isBordered  size='md' max={4}>
            {campaign.influencers.map((influencer) => (
              <Avatar
                key={influencer.id}
                src={influencer.avatar}
                size='md'
              />
            ))}
          </AvatarGroup>
        </div>
      </CardBody>
    </Card>
  )

  const campaignsGrid_markup = (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {DATA.campaigns.map(campaign => campaignsGrid_renderCard(campaign))}
    </div>
  )

  const campaignsGrid = {
    markup: campaignsGrid_markup,
  }

  return (
    <div className='flex flex-col gap-12 py-6 pl-6 pr-8 sm:gap-4'>
      {header.markup}
      {campaignsGrid.markup}
      <div className='h-24'></div>
    </div>
  );
}