const user = require('../models/user');

module.exports = {
    createUser : async (request, response) => {
        const data = new user(request.body);
        console.log(data);
        try {
            const save = await data.save();
            return response.status(200).json({message: 'berhasil', data: save, code: response.status})
        } catch (error) {
            return response.status(400).json({message: 'gagal', code: response.status})
        }
        // response.status(200).json({message: 'berhasil', data: {nama: nama, email: email, username: username}});
    },

    getUser : async (request, response) => {
        const limit = request.params.limit ? request.params.limit : 10;
        const offset = request.params.offset ? request.params.offset : 0;
        // console.log('limit : ',limit, 'offset : ',offset);
        try {
            const find = await user.find().limit(limit).skip(offset);
            response.status(200).json({message: 'berhasil', code:200, data: find, limit: limit, offset: offset});
        } catch (error) {
            response.status(400).json({message: 'gagal', code:400})
        }
    },

    getUserByID : async (request, response) => {
        const id = request.params.id;
        // console.log(id);
        try {
            const find = await user.findOne({_id: id});
            // const find = await user.findById(id)
            response.status(200).json({message : 'berhasil', code: 200, data : find})
        } catch (error) {
            response.status(400).json({message: 'gagal', code:400})
        }
    },

    deleteUser : async (request, response) => {
        const id = request.params.id;
        const find = await user.findById(id);
        // const find = await user.findOne({_id : id})
        if(find){
            try {
                const hapus = await user.deleteOne({_id: id});
                response.status(200).json({message : 'berhasil', code :200})
            } catch (error) {
                response.status(400).json({message : 'gagal', code: 400});
            }
        }else{
            response.status(400).json({message : 'Data tidak ditemukan', code: 400})
        }
    }
}

// const createUser = async (request, response) => {
//     const data = new user(request.body);
//     console.log(data);
//     try {
//         const save = await data.save();
//         return response.status(200).json({message: 'berhasil', data: save, code: response.status})
//     } catch (error) {
//         return response.status(400).json({message: 'gagal', code: response.status})
//     }
// }

// const getUser = async (request, response) => {
//     const limit = request.params.limit ? request.params.limit : 10;
//     const offset = request.params.offset ? request.params.offset : 0;
//     // console.log('limit : ',limit, 'offset : ',offset);
//     try {
//         const find = await user.find().limit(limit).skip(offset);
//         response.status(200).json({message: 'berhasil', code:200, data: find, limit: limit, offset: offset});
//     } catch (error) {
//         response.status(400).json({message: 'gagal', code:400})
//     }    
// }

// const getUserByID = async(request, response) => {
//     const id = request.params.id;
//     // console.log(id);
//     try {
//         const find = await user.findOne({_id: id});
//         // const find = await user.findById(id)
//         response.status(200).json({message : 'berhasil', code: 200, data : find})
//     } catch (error) {
//         response.status(400).json({message: 'gagal', code:400})
//     }        
// }

// const deleteUser = async (request, response) => {
//     const id = request.params.id;
//     const find = await user.findById(id);
//     // const find = await user.findOne({_id : id})
//     if(find){
//         try {
//             const hapus = await user.deleteOne({_id: id});
//             response.status(200).json({message : 'berhasil', code :200})
//         } catch (error) {
//             response.status(400).json({message : 'gagal', code: 400});
//         }
//     }else{
//         response.status(400).json({message : 'Data tidak ditemukan', code: 400})
//     }    
// }

// module.exports = {
//     createUser,
//     getUser,
//     getUserByID,
//     deleteUser,
// }
