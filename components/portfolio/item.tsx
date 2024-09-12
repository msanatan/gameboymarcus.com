import {
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
} from "@chakra-ui/react";
import Image from "next/image";

function ItemLinks({
  title,
  links,
}: {
  title: string;
  links: Record<string, string>;
}) {
  const buttons = [];
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
          size={["md", "lg", "xl"]}
          padding={[1, 2, 3]}
          color="black"
          fontFamily="arcadeGamer"
          textAlign="center"
        >
          {data.title}
        </Heading>
        <Center>
          <Image
            src={data.img.url}
            alt={data.img.alt}
            height={256}
            width={256}
          />
        </Center>
        <Stack mt="6" spacing="3">
          <Text
            as="p"
            fontSize={["xs", "sm"]}
            color="white"
            fontFamily="pressStart2P"
            textAlign="justify"
          >
            {data.description}
          </Text>
          <Text
            as="p"
            fontSize={["xs", "sm"]}
            color="white"
            fontFamily="pressStart2P"
            textAlign="justify"
          >
            {`Contribution: ${data.role}`}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ItemLinks title={data.title} links={data.links} />
      </CardFooter>
    </Card>
  );
}
