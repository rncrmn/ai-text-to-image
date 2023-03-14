import { Component, Show } from "solid-js";
import { createSignal } from "solid-js";
import axios from "axios";
import PurpleCat from "../assets/purple-cat-in-space.png";

const TextToImage: Component = () => {
  const [text, setText] = createSignal<string>("");
  const [image, setImage] = createSignal<string>("");
  const [loading, setLoading] = createSignal<boolean>(false);

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    setLoading(true);
    const generatedImage = await generateImage(text());
    setImage(generatedImage);
    setLoading(false);
  };

  const generateImage = async (text: string) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          model: "image-alpha-001",
          prompt: text,
          n: 1,
          size: "512x512",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      const image_url = response.data.data[0].url;

      return image_url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="w-full max-w-lg">
      <h1 class="text-4xl text-center text-gray-900 font-bold mb-10">
        Text to Image Generator
      </h1>
      <form
        onSubmit={handleSubmit}
        class="flex justify-center items-center w-full shadow-md rounded-md mb-10"
      >
        <input
          type="text"
          placeholder="A photo of purple cat in space"
          value={text()}
          onInput={(event: Event) =>
            setText((event.target as HTMLInputElement).value)
          }
          class="py-3 px-4 w-full bg-white rounded-tl-md rounded-bl-md focus:outline-none"
        />
        <button
          type="submit"
          class="py-3 px-4 font-semibold font-mono bg-white hover:bg-black hover:text-white border-l-[1px] rounded-tr-md rounded-br-md"
          disabled={text() ? false : true}
        >
          {loading ? "Generate" : "Generating"}
        </button>
      </form>
      <Show
        when={image()}
        fallback={
          <img src={PurpleCat} alt="Generated Image" class="border-2" />
        }
      >
        <img src={image()} alt="Generated Image" class="border-2" />
      </Show>
    </div>
  );
};

export default TextToImage;
