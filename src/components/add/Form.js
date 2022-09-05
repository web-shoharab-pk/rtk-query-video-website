// import Success from "../ui/Success";
import { useState } from "react";
import { useAddVideoMutation } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import Success from "../ui/Success";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";

export default function Form() {

    const [addVideo, { isError, isSuccess, error, isLoading }] = useAddVideoMutation();

    const [videoData, setVideoData] = useState({
        title: "",
        author: "",
        description: "",
        link: "",
        thumbnail: "",
        date: "",
        duration: "",
        views: "",
        avatar: "",
    })

    const handleChange = (e) => {

        setVideoData({ ...videoData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("videoData", videoData);
        addVideo(videoData);

        resetForm()
    }

    const resetForm = () => {
        setVideoData({
            title: "",
            author: "",
            description: "",
            link: "",
            thumbnail: "",
            date: "",
            duration: "",
            views: "",
            avatar: "",
        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <TextInput title="Video Title" required value={videoData.title} name="title" onChange={handleChange} onBlur={handleChange} />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <TextInput title="Author" required value={videoData.author} name="author" onChange={handleChange} onBlur={handleChange} />
                        </div>

                        <div className="col-span-6">
                            <TextArea title="Description" required value={videoData.description} name="description" onChange={handleChange} onBlur={handleChange} />
                        </div>

                        <div className="col-span-6">
                            <TextInput title="YouTube Video link" required type="url" value={videoData.link} name="link" onChange={handleChange} onBlur={handleChange} />
                        </div>

                        <div className="col-span-6">
                            <TextInput title="Thumbnail link" required type="url" value={videoData.thumbnail} name="thumbnail" onChange={handleChange} onBlur={handleChange} />
                        </div>

                        <div className="col-span-6">
                            <TextInput title="Channel Avatar" required value={videoData.avatar} name="avatar" onChange={handleChange} onBlur={handleChange} />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <TextInput title="Upload Date" required value={videoData.date} name="date" onChange={handleChange} onBlur={handleChange} />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput title="Video Duration" required value={videoData.duration} name="duration" onChange={handleChange} onBlur={handleChange} />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput title="Video no of views" required value={videoData.views} name="views" onChange={handleChange} onBlur={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      disabled={isLoading}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>

                {
                    isSuccess && <Success message="Video was added successfully" />
                }

                {
                    isError && <Error message={error} />
                }

            </div>
        </form>
    );
}
