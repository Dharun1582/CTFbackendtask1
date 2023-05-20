module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define("User",{
        Name:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
            },
        },

        mail:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                notEmpty:true,
            },
        },

        pass:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
            },
        },

        confirmed:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
            allowNull:false,
            validate:{
                notEmpty:true,
            },
        },
    });
    return User;
}