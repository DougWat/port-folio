/**
* A horizontal blur filter by Mat Groves http://matgroves.com/ @Doormat23
*/
Phaser.Filter.BlurX = function (game) {

    Phaser.Filter.call(this, game);

    this.uniforms.blur = { type: '1f', value: 0.05  };

    this.fragmentSrc = [

      "precision mediump float;",
      "varying vec2 vTextureCoord;",
      "varying vec4 vColor;",
      "uniform float blur;",
      "uniform sampler2D uSampler;",

        "void main(void) {",

          "vec4 sum = vec4(0.0);",

        "vec4 blur1 = vec4(0.0);",
        "vec4 blur2 = vec4(0.0);",
        "vec4 blur3 = vec4(0.0);",
        "vec4 blur4 = vec4(0.0);",
        "blur1 = texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.05;",
        "blur2 = texture2D(uSampler, vec2(vTextureCoord.x + 2.0*blur, vTextureCoord.y)) * 0.05;",
        "blur3 = texture2D(uSampler, vec2(vTextureCoord.x + 4.0*blur, vTextureCoord.y)) * 0.05;",
        "blur4 = texture2D(uSampler, vec2(vTextureCoord.x + 6.0*blur, vTextureCoord.y)) * 0.05;",
        "blur1 *= vec4(2,1,1,0);",
        "blur2 *= vec4(1,2,1,0);",
        "blur3 *= vec4(1,1,2,0);",
        "blur4 *= vec4(2,1,1,0);",
        
        "sum += blur1;",
         "sum += blur2;",
         "sum += blur3;",
         "sum += blur4;",
                "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * .80;",
          "gl_FragColor = sum;",

        "}"
    ];

};

Phaser.Filter.BlurX.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.BlurX.prototype.constructor = Phaser.Filter.BlurX;

Object.defineProperty(Phaser.Filter.BlurX.prototype, 'blur', {

    get: function() {
        return this.uniforms.blur.value / (1/15000);
    },

    set: function(value) {
        this.dirty = true;
        this.uniforms.blur.value = (1/15000) * value;
    }

});