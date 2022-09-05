import { useGetVideosQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {

    const { data: videos, isLoading, isError } = useGetVideosQuery();

    console.log("videos", videos)

    // decide what to render
    let content = null;

    if (isLoading) {
        content =
            (<>
                <VideoLoader />
                <VideoLoader />
                <VideoLoader />
                <VideoLoader />
            </>)
    }

    if (!isLoading && isError) {
        content = <Error message="There was an error" />
    }

    if (!isLoading && !isError && videos?.length === 0) {
        content = <Error message="No videos found!"/>
    }

    if (!isLoading && !isError && videos?.length > 0) {
        content = videos?.map((video) => <Video video={video} key={video.id} />)
    }

    return content;
}
