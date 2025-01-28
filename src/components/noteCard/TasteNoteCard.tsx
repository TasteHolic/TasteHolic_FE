import React from "react";

    const styles = {
        card: {
            display: "inline-flex",
            width: "257px",
            height: "232px",
            borderRadius: "16px",
            background: "linear-gradient(106deg, rgba(18, 18, 18, 0.14) 0%, rgba(255, 255, 255, 0.14) 99.37%)",
            boxShadow: "0px 1.492px 7px 1.119px rgba(255, 255, 255, 0.28)",
            flexDirection: "column" as const,
        },
        container: {
            display: "flex",
            flexDirection: "column" as const,
            padding: "24px",
            gap: "20px",
        },
        section: {
            display: "flex",
            flexDirection: "column" as const,
            gap: "9px",
        },
        row: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
        },
        input: {
            color: "#FFF",
            height: "19px",
            fontFamily: "Pretendard",
            fontSize: "16px",
            fontStyle: "normal" as const,
            fontWeight: 300,
            lineHeight: "normal",
            letterSpacing: "-0.64px",
            display: "flex",
            alignItems: "flex-start",
        },
        circle: {
            marginLeft: "2px",
            width: "20px",
            height: "20px",
        },
        label: {
            color: "#FFF",
            height: "19px",
            textAlign: "center" as const,
            fontFamily: "Pretendard",
            fontSize: "16px",
            fontStyle: "normal" as const,
            fontWeight: 600,
            lineHeight: "normal",
            letterSpacing: "-0.64px",
        },
    };

interface TasteNotes {
    des1: string;
    des2: string;
    des3: string;
}
const TasteNoteCard: React.FC<TasteNotes> = ({
    des1, //향 description
    des2, //맛 description
    des3, //여운 description
}) => {
    return (
        <div style={styles.card}>
            <div style={styles.container}>
                <div style={styles.section}>
                    <div style={styles.row}>
                        <div style={styles.circle}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="10" r="10" fill="#483D8B" />
                            </svg>
                        </div>
                        <div style={styles.label}>향</div>
                    </div>
                    <div style={styles.input}>

                        {des1} {/* 향 description */}

                    </div>
                </div>

                <div style={styles.section}>
                    <div style={styles.row}>
                        <div style={styles.circle}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="10" r="10" fill="#8279B9" />
                            </svg>
                        </div>
                        <div style={styles.label}>맛</div>
                    </div>
                    <div style={styles.input}>

                        {des2} {/* 맛 description */}

                    </div>
                </div>

                <div style={styles.section}>
                    <div style={styles.row}>
                        <div style={styles.circle}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="10" r="10" fill="#BEBADC" />
                            </svg>
                        </div>
                        <div style={styles.label}>여운</div>
                    </div>
                    <div style={styles.input}>

                        {des3} {/* 여운 description */}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TasteNoteCard;
