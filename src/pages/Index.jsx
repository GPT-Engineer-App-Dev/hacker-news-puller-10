import { Box, VStack, Link, Text, Heading, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");

  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
      .then(response => response.json())
      .then(data => {
        const storyIds = data.slice(0, 10);
        return Promise.all(storyIds.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`).then(res => res.json())));
      })
      .then(storiesData => {
        setStories(storiesData);
      })
      .catch(error => console.error("Error fetching stories:", error));
  }, []);

  return (
    <Box p={5} maxW="container.md" mx="auto">
      <Heading mb={4} textAlign="center">Latest Hacker News Stories</Heading>
      <VStack spacing={4} align="stretch">
        {stories.map(story => (
          <Box key={story.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg={isLargerThan480 ? "gray.100" : "white"}>
            <Link href={story.url} isExternal color="teal.500" fontWeight="bold">
              {story.title}
            </Link>
            <Text mt={2}>By {story.by}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;