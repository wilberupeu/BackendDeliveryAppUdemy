const db=require('../config/config');
const crypto =require('crypto');

const User={};

User.getAll=()=>{
    
const sql=`
SELECT
* 
FROM 
users
`;
return db.manyOrNone(sql);

} 
  
User.findById=(id, callback)=>{

    const sql=`
    select
    id,
    email,
    name,
    lastname,
    image,
    phone,
    password,
    session_token
   from
    users
   where 
     id=$1    
    `;

    return db.oneOrNone(sql,id).then(user=>{callback(null,user)});
} 


User.findByEmail=(email)=>{
    const sql=`
    select
        u.id,
        u.email,
        u.name,
        u.lastname,
        u.image,
        u.phone,
        u.password,
        u.session_token,
        json_agg(
            json_build_object(
		'id', r.id,
		'name', r.name,
		'image', r.image,
		'route', r.route
	    )) as roles
    from
    users as u
    inner join user_has_roles as uhr on uhr.id_user=u.id
    inner join roles as r on r.id=uhr.id_rol

    where 
    u.email=$1
    group by 
         u.id    
    `;
    return db.oneOrNone(sql,email);
}

User.findByUserId=(id)=>{
    const sql=`
    select
        u.id,
        u.email,
        u.name,
        u.lastname,
        u.image,
        u.phone,
        u.password,
        u.session_token,
        json_agg(
            json_build_object(
		'id', r.id,
		'name', r.name,
		'image', r.image,
		'route', r.route
	    )) as roles
    from
    users as u
    inner join user_has_roles as uhr on uhr.id_user=u.id
    inner join roles as r on r.id=uhr.id_rol

    where 
    u.id=$1
    group by 
         u.id    
    `;
    return db.oneOrNone(sql,id);
}

User.create=(user)=>{

const myPasswordHashed=crypto.createHash('md5').update(user.password).digest('hex');

user.password=myPasswordHashed;

    console.log('email : '+user.email); 
    console.log('name : '+user.name); 
    console.log('lastname : '+user.lastname); 
    console.log('phone : '+user.phone); 
    console.log('image : '+user.image); 
    console.log('password : '+user.password); 

    const sql=`
    INSERT INTO 
    users(
        email,
        name,
        lastname,
        phone,
        image,
        password,
        created_at,
        updated_at
    )
    VALUES(
        $1,$2,$3,$4,$5,$6,$7,$8
    ) RETURNING id
    `;
     
    return db.oneOrNone(sql,[
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        user.password,
        new Date(),
        new Date() 
    ]);

} 
User.updateToken=(id,token)=>{
    console.log(` id:  ${id} `); 
    console.log(` token:  ${token} `); 
    const sql= `
    UPDATE 
         users
    SET
         session_token=$2
    WHERE
          id=$1
    `;
    return db.none(sql,[id,
        token
    ]);
}

User.update=(user)=>{

    console.log(` user.id:  ${user.id} `); 
    console.log(` user.name:  ${user.name} `); 
    console.log(` user.lastname:  ${user.lastname} `); 
    console.log(` user.phone:  ${user.phone} `); 
    console.log(` user.image:  ${user.image} `); 
       

    const sql= `
    UPDATE 
         users
    SET
         name= $2,
         lastname=$3,
         phone=$4,
         image=$5,
         updated_at=$6
    WHERE
          id=$1
    `;

    return db.none(sql,[user.id,
    user.name,
    user.lastname,
    user.phone,
    user.image,
    new Date()
    ]);

}

User.isPasswordMatched=(userPassword,hash)=>{

    console.log('================================================');
    console.log('userPassword: '+userPassword);
    console.log('hash:  '+hash); 
    const myPasswordHashed=crypto.createHash('md5').update(userPassword).digest('hex');
    console.log('myPasswordHashed: '+myPasswordHashed); 
    console.log('================================================');

    if(myPasswordHashed===hash){
        console.log('true'); 
        return true;
    }
    console.log('false'); 
    return false;
    
} 

module.exports=User;
