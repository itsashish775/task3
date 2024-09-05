
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './addCustomerForm.css';
import { uploadImage } from '../apis/uploadImage';
import { uploadVideo } from '../apis/uploadVideo';
import { registerCustomer } from '../apis/registerCustomer';
import { useNavigate } from 'react-router-dom';

const AddCustomer = () => {
    const navigate = useNavigate()
    const [imagePreview, setImagePreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            country: '',
            image: null,
            video: null,
            terms: false,
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            phone: Yup.string().matches(/^\d{10}$/, 'Phone number is not valid').required('Required'),
            address: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            state: Yup.string().required('Required'),
            country: Yup.string().required('Required'),
            image: Yup.mixed()
                .required()
                .test('validateImage', 'Invalid image URL', value => {
                    if (typeof value === 'string') {
                        return true
                    } else if (value && value.size) {
                        if (value.size > 5 * 1024 * 1024) {
                            return this.createError({ message: 'Image size should be less than 5 MB' });
                        }
                        return true;
                    }
                    return true;
                }),
            video: Yup.mixed()
                .required()
                .test('validateImage', 'Invalid video URL', value => {
                    if (typeof value === 'string') {
                        return true
                    } else if (value && value.size) {
                        if (value.size > 15 * 1024 * 1024) {
                            return this.createError({ message: 'Image size should be less than 5 MB' });
                        }
                        return true;
                    }
                    return true;
                }),
            terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
        }),
        onSubmit: async (values) => {
            try {


                const getImageUrl = await uploadImage({ file: values?.image });
                values.image = getImageUrl?.url
                const getVideoUrl = await uploadVideo({ file: values?.video })
                values.video = getVideoUrl?.url

                const registerRes = await registerCustomer(values)
                console.log(registerRes);
                if (registerRes.status == 201) {
                    navigate("/")
                }

                console.log('Form Submitted', values);
            } catch (error) {
                console.error('Error uploading the image', error);
            }
        },
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImagePreview(URL.createObjectURL(file));
        formik.setFieldValue('image', file);
    };
    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size <= 15 * 1024 * 1024) { // Check if the file size is less than 15MB
            setVideoPreview(URL.createObjectURL(file));
            formik.setFieldValue('video', file);
        } else {
            formik.setFieldError('video', 'Video size should be less than 15 MB');
        }
    };

    return (
        <>
            <div>
                <h1>
                    Add Customer Form
                </h1>
            </div>
            <form className="form" onSubmit={formik.handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            className="form-input"
                            type="text"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name ? <div className="form-error">{formik.errors.name}</div> : null}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            className="form-input"
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? <div className="form-error">{formik.errors.email}</div> : null}
                    </div>
                </div>
                <div className="form-row">


                    <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input
                            className="form-input"
                            type="text"
                            name="phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                        />
                        {formik.touched.phone && formik.errors.phone ? <div className="form-error">{formik.errors.phone}</div> : null}
                    </div>



                    <div className="form-group">
                        <label className="form-label">City</label>
                        <select
                            className="form-input"
                            name="city"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.city}
                        >
                            <option value="" label="Select city" />
                            <option value="City1" label="City1" />
                            <option value="City2" label="City2" />
                            {/* Add more cities as needed */}
                        </select>
                        {formik.touched.city && formik.errors.city ? <div className="form-error">{formik.errors.city}</div> : null}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">State</label>
                        <select
                            className="form-input"
                            name="state"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.state}
                        >
                            <option value="" label="Select state" />
                            <option value="State1" label="State1" />
                            <option value="State2" label="State2" />
                            {/* Add more states as needed */}
                        </select>
                        {formik.touched.state && formik.errors.state ? <div className="form-error">{formik.errors.state}</div> : null}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Country</label>
                        <select
                            className="form-input"
                            name="country"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.country}
                        >
                            <option value="" label="Select country" />
                            <option value="Country1" label="Country1" />
                            <option value="Country2" label="Country2" />
                            {/* Add more countries as needed */}
                        </select>
                        {formik.touched.country && formik.errors.country ? <div className="form-error">{formik.errors.country}</div> : null}
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Address</label>
                    <textarea
                        className="form-input"
                        name="address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                    />
                    {formik.touched.address && formik.errors.address ? <div className="form-error">{formik.errors.address}</div> : null}
                </div>
                <div className="form-row">

                    <div className="form-group">
                        <label className="form-label">Upload Image</label>
                        <input
                            className="form-input"
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            onBlur={formik.handleBlur}
                            accept="image/*"
                        />
                        {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
                        {formik.touched.image && formik.errors.image ? <div className="form-error">{formik.errors.image}</div> : null}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Upload Short Video of User Introduction</label>
                        <input
                            className="form-input"
                            type="file"
                            name="video"
                            onChange={handleVideoChange}
                            onBlur={formik.handleBlur}
                            accept="video/*"
                        />
                        {videoPreview && <video src={videoPreview} controls className="video-preview"></video>}
                        {formik.touched.video && formik.errors.video ? <div className="form-error">{formik.errors.video}</div> : null}
                    </div>

                </div>
                <div className="form-group">
                    <label className="form-label">
                        <input
                            className="form-checkbox"
                            type="checkbox"
                            name="terms"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            checked={formik.values.terms}
                        />
                        Accept Terms and Conditions
                    </label>
                    {formik.touched.terms && formik.errors.terms ? <div className="form-error">{formik.errors.terms}</div> : null}
                </div>

                <button className="form-button" type="submit">Submit</button>
            </form>
        </>
    );
};

export default AddCustomer;

