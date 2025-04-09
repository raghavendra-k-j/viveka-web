type AppErrorViewProps = {
    message: string;
    description: string | null;
    actions: React.ReactNode[];
}

export default function AppErrorView(props: AppErrorViewProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600">{props.message}</h1>
            {props.description && <p className="mt-4 text-lg text-gray-700">{props.description}</p>}
            {props.actions.length > 0 && (
                <div className="mt-6 flex space-x-4">
                    {props.actions.map((action, index) => (
                        <div key={index}>{action}</div>
                    ))}
                </div>
            )}
        </div>
    );
}