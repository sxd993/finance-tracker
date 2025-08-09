export const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen gap-4">
            <h1 className="text-2xl font-bold">
                <span className="text-orange-500">Finance</span> Tracker
            </h1>
            <Loading />
            <p className="text-gray-500 text-sm">Загружаем...</p>
        </div>
    )
}

