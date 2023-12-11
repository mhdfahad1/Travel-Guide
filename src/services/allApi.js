const { Base_url } = require("./BaseUrl");
const { commonAPI } = require("./commonApi");

export const registerUserAPI = async (user) => {
    return await commonAPI("POST", `${Base_url}/user/sighnup`, user, "")
}

// login
export const loginuserAPI = async (user) => {
    return await commonAPI("POST", `${Base_url}/user/login`, user, "")
}
// agency register
export const registerAgencyAPI = async (user) => {
    return await commonAPI("POST", `${Base_url}/agency/sighnup`, user, "")
}

// login
export const agencyLoginAPI = async (user) => {
    return await commonAPI("POST", `${Base_url}/agency/login`, user, "")
}

// add package
export const addPackeageAPI = async (tripPackages) => {
    return await commonAPI("POST", `${Base_url}/package/add`, tripPackages, "")

}

// get all packages
export const getallPackagesAPI = async () => {
    return await commonAPI("GET", `${Base_url}/packages/all`, "", "")

}

// get a package
export const getApackageAPI = async (id) => {
    return await commonAPI("GET", `${Base_url}/a/package/${id}`, "", "")

}

// get agency package
export const agencyPackageAPI = async (user) => {
    return await commonAPI("POST", `${Base_url}/package/agency`, user, "")

}
// get all agencies
export const getallAgencyAPI = async () => {
    return await commonAPI("GET", `${Base_url}/agency/all`, "", "")

}
// add to wishlist
export const addWishlistAPI = async (wishlist, reqHeader) => {
    return await commonAPI("POST", `${Base_url}/add/wishlist`, wishlist, reqHeader)

}

export const getWishlistAPI = async (reqHeader) => {
    return await commonAPI("GET", `${Base_url}/get/wishlist`, "", reqHeader)

}

export const deleteWishlistAPI = async (id,reqHeader) => {
    return await commonAPI("DELETE", `${Base_url}/delete/wishlist/${id}`, {}, reqHeader)

}
// book package
export const bookPackageAPI = async (booking,reqHeader) => {
    return await commonAPI("POST", `${Base_url}/book/package`, booking, reqHeader)

}

// get all bookings
export const getBookingsAPI = async (reqHeader) => {
    return await commonAPI("GET", `${Base_url}/get/book/package`, "", reqHeader)

}
// get agency bookings
export const getAgencybookingsAPI = async (user) => {
    return await commonAPI("POST", `${Base_url}/get/agency/book`, user, "")

}
export const deletePackageAPI = async (_id) => {
    return await commonAPI("DELETE", `${Base_url}/delete/package/${_id}`, {}, "")

}
export const editPackageAPI = async (editedPackage) => {
    return await commonAPI("PUT", `${Base_url}/edit/package`, editedPackage, "")

}
export const deleteBookingAPI = async (_id) => {
    return await commonAPI("DELETE", `${Base_url}/delete/booking/${_id}`, {}, "")

}