import { animated } from "@react-spring/web";
import { ThemeSprings } from "../../../types/types";

type FeatureSectionProps = {
    title : string;
    description : string;
    items?: string[];
    themeSprings: ThemeSprings;
};
export const FeatureSection = ({
    title,
    description,
    items,
    themeSprings
}: FeatureSectionProps) => {
    return (
    <animated.section
        style={{
            marginBottom: "2rem",
            maxWidth: "1200px",
            width: "100%"
        }}
    >
        <animated.h2
            style={{
                color: themeSprings.contrastPrimary.get(),
                fontSize: "2rem",
                marginBottom: '1rem'
            }}
        >
            {title}
        </animated.h2>
        <animated.p
            style={{
                color: themeSprings.contrastSecondary.get(),
                fontSize: "1.2rem",
                lineHeight: "1.5",
                marginBottom: items ? '1rem' : '0'
            }}
        >
            {description}
        </animated.p>
        {items && items.length > 0 && (
            <animated.ul
                style={{
                    color: themeSprings.contrastSecondary.get(),
                    fontSize: "1rem",
                    lineHeight: "1.6",
                    marginLeft: "2rem"
                }}
            >
                {items.map((item, index) => (
                    <li key={index} style={{ marginBottom: "0.5rem" }}>
                        {item}
                    </li>
                ))}
            </animated.ul>
        )}
    </animated.section>
    );
}