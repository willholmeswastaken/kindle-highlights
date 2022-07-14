import { UploadIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import Head from "next/head";
import { useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AlertDialog } from "../components";

interface ImportFormInputs {
    file: FileList;
}

const Import: NextPage = () => {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<ImportFormInputs>();
    const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
    const [showFailureDialog, setShowFailureDialog] = useState<boolean>(false);
    const onSubmit: SubmitHandler<ImportFormInputs> = async data => {
        const res = await fetch('/api/fileupload', {
            method: 'POST',
            body: data.file[0]
        });
        if (res.status === 201) {
            setShowSuccessDialog(true);
            setShowFailureDialog(false);
        } else {
            setShowSuccessDialog(false);
            setShowFailureDialog(true);
        }
    }

    const file = watch('file');
    const fileName = useMemo(() => {
        if (file && file.length > 0)
            return file[0]?.name;
        return 'File not uploaded';
    }, [file]);

    const onDismissSuccessDialog = () => setShowSuccessDialog(false);
    const onDismissFailureDialog = () => setShowFailureDialog(false);
    return (
        <>
            <Head>
                <title>Import</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <AlertDialog
                title="Failed to upload file!"
                description="There was an issue when trying to upload your highlights file, please try again!"
                buttonText="Close"
                buttonType="danger"
                isOpen={showFailureDialog}
                closeModal={onDismissFailureDialog} />

            <AlertDialog
                title="Highlights imported!"
                description="Your highlights have been imported successfully!"
                buttonText="Thanks"
                buttonType="success"
                isOpen={showSuccessDialog}
                closeModal={onDismissSuccessDialog} />

            <div className="flex flex-col h-screen w-full lg:w-3/4 items-center gap-y-4 sm:gap-y-8">
                <h1 className="text-4xl bold text-brandText">Import</h1>
                <div className="h-1/2 w-full lg:w-3/4">
                    <form className="flex flex-col gap-y-4 justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col bg-white rounded-lg w-full lg:w-1/2 h-fit py-2">
                            <div className="flex flex-row gap-x-4 mt-1 ml-3">
                                <div className="bg-blue-50 rounded-full p-2 h-10 w-10 mt-1">
                                    <UploadIcon className="h-6 w-6 text-blue-600 " />
                                </div>
                                <div className="flex flex-grow flex-col">
                                    <span className="text-md text-brandText">Your file</span>
                                    <span className="text-sm text-gray-400">{fileName}</span>
                                </div>
                                <input id="fileUpload" className="hidden" type="file" {...register("file", { required: true })} />
                                <label className="bg-blue-50 text-sm rounded-md px-3 mr-4 mt-2 cursor-pointer py-1 h-fit text-blue-600" htmlFor="fileUpload">
                                    Upload
                                </label>
                            </div>
                        </div>
                        {errors.file && <span className="text-red-500 text-sm text-left">File upload is required</span>}
                        <button type="submit" className="bg-blue-100 text-blue-600 disabled:bg-gray-200 disabled:text-gray-500 rounded-md h-10 w-1/2 md:w-1/4">
                            {
                                isSubmitting
                                    ? (
                                        <div className="flex flex-row justify-center items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Uploading...
                                        </div>)
                                    : 'Submit'
                            }

                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Import;
