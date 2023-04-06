import LoadingSkeleton from "@/components/loading";
import { toast } from "react-toastify";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [emojis, setEmojis] = useState<
    { name: string; char: string; copied?: boolean }[]
  >([]);
  const [inputContainerFocused, setInputContainerFocused] = useState(false);
  const [inputEnterHovered, setInputEnterHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = useCallback(async () => {
    try {
      if (isLoading || !inputRef.current?.value) return;

      setIsLoading(true);

      const res = await fetch("/api/get-emojis", {
        method: "POST",
        body: JSON.stringify({
          prompt: inputRef.current?.value,
        }),
      });

      const { options } = await res.json();

      setEmojis(options);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      toast("🙃 Can't imagine any emoji, you can re-write please?", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [isLoading]);

  const handleEmojiClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const char = e.currentTarget.querySelector("#char")?.textContent;

    if (char) {
      navigator.clipboard.writeText(char);

      setEmojis((emojis) =>
        emojis.map((emoji) =>
          emoji.char === char ? { ...emoji, copied: true } : emoji
        )
      );

      setTimeout(() => {
        setEmojis((emojis) =>
          emojis.map((emoji) =>
            emoji.char === char ? { ...emoji, copied: false } : emoji
          )
        );
      }, 2000);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col items-center w-screen pt-10 pb-20 md:pb-10">
        <div
          className={`flex flex-col items-center gap-8 justify-center ${
            emojis.length ? "" : "h-screen"
          }`}
        >
          <h1 className="title text-3xl leading-10 text-center font-sans font-semibold w-9/10 md:w-auto">
            emoticon.pro
          </h1>
          <div className="flex items-center justify-center flex-col w-screen md:gap-28 gap-16">
            <div className="flex items-center flex-col w-screen gap-3">
              <p className="text-center leading-7 text-accents-6 text-6 font-sans w-9/10">
                Describe the emoji or emoticon that you would like to find
              </p>

              <div
                onClick={() => {
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
                style={{
                  ...(inputContainerFocused && {
                    border: "1px solid #fff",
                  }),
                }}
                className="flex justify-between bg-accents-1 w-9/10 md:w-3/4 md:max-w-2xl p-1 rounded-xl"
              >
                <input
                  onFocus={() => setInputContainerFocused(true)}
                  onBlur={() => setInputContainerFocused(false)}
                  ref={inputRef}
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();

                      handleSearch();
                    }
                  }}
                  placeholder="A man on a horse"
                  className="text-white placeholder:text-accents-6 bg-transparent px-5 w-full"
                />

                <div
                  onMouseEnter={() => setInputEnterHovered(true)}
                  onMouseLeave={() => setInputEnterHovered(false)}
                  onClick={handleSearch}
                  className="flex gap-4 hover:text-white items-center justify-center text-accents-6 cursor-pointer hover:bg-accents-2 rounded-full px-5 py-3"
                >
                  <p className="">Enter</p>

                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12.5H19"
                      stroke={inputEnterHovered ? "#ffffff" : "#999999"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 5.5L19 12.5L12 19.5"
                      stroke={inputEnterHovered ? "#ffffff" : "#999999"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-12 gap-y-10 max-w-9/10 md:max-w-2xl justify-center items-center">
              {!isLoading &&
                emojis.map((emoji) => (
                  <div
                    onClick={handleEmojiClick}
                    key={emoji.char}
                    style={{
                      ...(emoji.copied && {
                        backgroundColor: "#0761D1",
                      }),
                    }}
                    className="bg-accents-1 hover:bg-accents-2 transition-all cursor-pointer rounded-2xl px-5 py-8 flex flex-col justify-center gap-6"
                  >
                    <p id="char" className="text-8xl text-center">
                      {emoji.char}
                    </p>
                    {emoji.copied ? (
                      <div className="flex items-center justify-center text-white gap-2">
                        <svg
                          width="19"
                          height="13"
                          viewBox="0 0 19 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.5 1L6.5 12L1.5 7"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>

                        <p>Copiado</p>
                      </div>
                    ) : (
                      <p className="text-accents-6 text-base leading-5 text-center w-6 ellipsis">
                        {emoji.name}
                      </p>
                    )}
                  </div>
                ))}

              {isLoading && (
                <>
                  <LoadingSkeleton />
                  <LoadingSkeleton />
                  <LoadingSkeleton />
                  <LoadingSkeleton />
                  <LoadingSkeleton />
                  <LoadingSkeleton />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
