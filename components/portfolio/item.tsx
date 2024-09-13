import {
  AspectRatio,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Heading,
  IconButton,
  Image as ChakraImage,
  Stack,
  Text,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import Image from "next/image";
import { JSX } from "react";

function ItemLinks({ title, links }: { title: string; links: PortfolioLinks }) {
  const buttons: JSX.Element[] = [];
  Object.entries(links).forEach(([linkType, url]) => {
    let iconFile = "";
    let aria = "";
    switch (linkType) {
      case "playStore":
        iconFile = "google-playstore.svg";
        aria = `Check out ${title} on the Play Store`;
        break;
      case "appleStore":
        iconFile = "apple-appstore.svg";
        aria = `Check out ${title} on the App Store`;
        break;
      case "itch":
        iconFile = "itch.svg";
        aria = `Check out ${title} on the itch.io`;
        break;
      case "meta":
        aria = `Check out ${title} on the Meta Quest Store`;
        iconFile = "meta-logo.svg";
        break;
      default:
        break;
    }
    buttons.push(
      <IconButton
        as="a"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={aria}
        icon={
          <ChakraImage src={`/images/portfolio/icons/${iconFile}`} maxW={8} />
        }
        size={["xs", "md"]}
        variant="none"
        key={linkType}
      />
    );
  });

  return <HStack spacing={[2, 4]}>{...buttons}</HStack>;
}

export default function Item({ data }: { data: PortfolioItem }) {
  return (
    <Card w={["sm", "md", "lg"]} bg="#FFDE59" padding={[2, 4, 8]}>
      <CardBody>
        <Heading
          as="h1"
          fontSize={["lg", "2xl"]}
          fontFamily="arcadeGamer"
          color="black"
          textAlign="center"
          padding={[1, 2, 3]}
        >
          {data.title}
        </Heading>
        <Center>
          <AspectRatio ratio={1} width={[256, 512]} height={[256, 512]}>
            <Image
              src={data.img.url}
              alt={data.img.alt}
              fill
              style={{ objectFit: "contain" }}
            />
          </AspectRatio>
        </Center>
        <Stack mt="6" spacing="3">
          <Tooltip label={data.description} hasArrow>
            <Text
              as="p"
              fontSize={[10, 14]}
              color="white"
              fontFamily="pressStart2P"
              textAlign="justify"
              noOfLines={3}
            >
              {data.description}
            </Text>
          </Tooltip>
          <Tooltip label={data.role} hasArrow>
            <Text
              as="p"
              fontSize={[10, 14]}
              color="white"
              fontFamily="pressStart2P"
              textAlign="left"
              noOfLines={[1, 3]}
            >
              {`Contribution: ${data.role}`}
            </Text>
          </Tooltip>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ItemLinks title={data.title} links={data.links} />
      </CardFooter>
    </Card>
  );
}
