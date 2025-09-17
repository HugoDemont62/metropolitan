import RevealText from "@/Animation/RevealText";

export default function Hero() {
    return (
        <section>
          <RevealText
          delay={.6}>
            <h1 className="text-9xl">
              Ophelia Museum
            </h1>
          </RevealText>
        </section>
    );
}