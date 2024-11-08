import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "@/API/product-api";
import useAuthStore from "@/stores/authStore";
import { Loader } from 'lucide-react';

const Uploadfile = ({ form, setForm,setForm2, inputImageRef, imageForm}) => {
  // javascript
  const token = useAuthStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(inputImageRef)

  const handleOnChange = (e) => {
    setIsLoading(true)
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = form.images; //[] empty array
      for (let i = 0; i < files.length; i++) {
        // console.log(files[i])

        // Validate
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} Not Image`);
          continue;
        }

        // Image Resize
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            // endpoint Backend
            uploadFiles(data)
              .then((res) => {
                console.log(res);

                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                setIsLoading(false)
                toast.success("Upload image Success!!!");
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false)
              });
          },
          "base64"
        );
      }
    }
  };

  // console.log(form);
  // console.log('imageForm', imageForm)

  const handleDelete = async(public_id) => {
    const images = form?.images
    await removeFiles(public_id)
    .then((res) => {
      // const filterImages = images.filter((item) => {
      //   console.log(item)
      //   return item.public_id !== public_id
      // })
      // console.log('imageForm', imageForm)
      // console.log('filterImages', filterImages)
      // // setForm({
      // //   ...form,
      // //   // images: filterImages
      // // })
      if(imageForm) {
        console.log('imageForm555555', imageForm)
      }
      setForm2(prev  => {
        console.log("prev",prev)
        return prev.images.filter(item => item.public_id !== public_id)
      })
      toast.error(res.data)
    })
    .catch((err) => {
      console.log(err)
    })

  }

  return (
    <div className="my-4">
      <div className="flex mx-4 gap-4 my-4">
        {
          isLoading && <Loader className="w-16 h-16 animate-spin"/>
        }
        
        {/* image */}
        {
          (imageForm || (form?.images?.length > 0 ? form.images : []))?.map((item, index) =>
            <div className="relative" key={index}>
              <img
                className="w-24 h-24 hover:scale-105" 
                src={item.imageUrl || item.secure_url} 
              />
              <span
                onClick={async() => {
                  handleDelete(item.public_id).then(() => {console.log('form!!!!!!!', form)})
                }} 
                
                className="absolute top-0 right-0 bg-red-500 p-1 rounded-md">X</span>
            </div>
          )
        }

        
      </div>

      <div>
        <input
          onChange={handleOnChange}
          type="file"
          name="images"
          multiple
          ref={inputImageRef}
        />
      </div>
    </div>
  );
};

export default Uploadfile;