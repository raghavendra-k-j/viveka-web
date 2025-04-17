type AvatarColor = {
    bgColor: string;
    textColor: string;
};

class AvatarColorUtil {

    private static colors: AvatarColor[] = [
        { bgColor: "#E57373", textColor: "#FFFFFF" },
        { bgColor: "#64B5F6", textColor: "#FFFFFF" },
        { bgColor: "#81C784", textColor: "#FFFFFF" },
        { bgColor: "#FFD54F", textColor: "#000000" },
        { bgColor: "#BA68C8", textColor: "#FFFFFF" },
        { bgColor: "#4DB6AC", textColor: "#FFFFFF" },
        { bgColor: "#FF8A65", textColor: "#FFFFFF" },
        { bgColor: "#90A4AE", textColor: "#FFFFFF" },
        { bgColor: "#A1887F", textColor: "#FFFFFF" },
        { bgColor: "#F06292", textColor: "#FFFFFF" },
    ];


    public static getAvatarColor(input: string): AvatarColor {
        const index = AvatarColorUtil.hashStringToIndex(input, this.colors.length);
        return this.colors[index];
    }


    private static hashStringToIndex(str: string, max: number): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash) % max;
    }
}

export {AvatarColorUtil};