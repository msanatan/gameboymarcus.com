import { Center, SimpleGrid } from "@chakra-ui/react";
import Item from "./item";
import portfolioData from "../../services/portfolio.json";

export default function Portfolio() {
  const data = portfolioData as Array<PortfolioItem>;

  return (
    <SimpleGrid columns={[1, 3]} spacing={[4, 8, 16]} w="full">
      {data.map((d) => (
        <Center key={d.title}>
          <Item data={d} />
        </Center>
      ))}
    </SimpleGrid>
  );
}
