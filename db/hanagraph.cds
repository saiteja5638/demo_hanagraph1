namespace demo_hg;

entity nodes1 {
    key Vertex_ID : String(75);
        name      : String(32);
        field1    : String(32);
        field2    : String(32);
        field3    : String(32);
}


entity edges {
    key edge_id    : Integer;
        length     : Integer;
        difficulty : String(16);
        start      : Association to one nodes1 not null   ;
        end        : Association to one nodes1 not null;
        mode       : String(8);
        status     : String(16);
      
}

// entity  vertices_new {
//     key Location_ID : String(5);
//     key Product_ID :String(40);
//     key Obj_type  :String(10);
//     key Vertex_ID :String(5);      
// }


// entity edges_new {
//     key ID          : Int32;
//     key Location_ID : String(5);
//     key Product_ID  : String(40);
//     key Obj_type    : String(10);
//     key Source      : String(5);
//     key Target      : String(5);
//         Weight      : Double;

// }
