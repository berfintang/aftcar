from flask import Request
from flask import Response
import pandas as pd

def get_cars():
    ret = pd.concat([pd.read_json("vavacar_final.json"),pd.read_json("arabam_com.json")])
    ret.drop_duplicates()
    ret.sort_values(by=["price_number"])
    return Response(ret.to_json(orient="records"),mimetype='application/json')

    
    