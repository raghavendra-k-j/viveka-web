import { AvatarColorUtil } from "@/domain/utils/AvatarColorUtil";

export const UserTileItem = ({ user }: { user: { name: string; email: string } }) => {
    const colors = AvatarColorUtil.getAvatarColor(user.email);
    const initial = user.name?.[0]?.toUpperCase() ?? "?";

    return (
        <div className="flex items-center gap-3">
            <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-semibold fs-md"
                style={{ backgroundColor: colors.bgColor, color: colors.textColor }}
            >
                {initial}
            </div>
            <div className="space-y-0.5">
                <div className="fs-md-m font-semibold text-content-primary line-clamp-2">
                    {user.name}
                </div>
                <div className="fs-sm-p text-content-secondary line-clamp-2">
                    {user.email}
                </div>
            </div>
        </div>

    );
};