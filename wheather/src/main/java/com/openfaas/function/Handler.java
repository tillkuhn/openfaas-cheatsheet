package com.openfaas.function;

import com.openfaas.model.IHandler;
import com.openfaas.model.IResponse;
import com.openfaas.model.IRequest;
import com.openfaas.model.Response;

import java.io.IOException;

import okhttp3.OkHttpClient;


public class Handler implements com.openfaas.model.IHandler {

    public IResponse Handle(IRequest req) {
        IResponse res = new Response();
        res.setBody("Hello, the wheather is sunns!");
        //return res;
        try {
            OkHttpClient client = new OkHttpClient();
            String apiUrl = System.getenv().get("API_URL");
            okhttp3.Request request = new okhttp3.Request.Builder()
                    .url(apiUrl + req.getBody())
                    .build();

            okhttp3.Response response = client.newCall(request).execute();
            String ret = response.body().string();
            res.setBody(ret);
        } catch (Exception e) {
            e.printStackTrace();
            res.setBody(e.toString());
        }
        return res;
    }

}