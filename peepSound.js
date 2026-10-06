
    class MultiToneGenerator {
        constructor() {
            this.init()
        }
        init() {
            this.delayNode = null;
            this.feedbackNode = null;
            // 再生中のオシレーターを id をキーにして管理する
            this.activeNodes = {};
            // idを自動生成するためのカウンタ
            this.idCounter = 0;
            this.envelope = {
                attack: 0.05,  // 音が立ち上がる時間
                decay: 0.5,    // 最大音量から維持音量に落ちる時間
                release: 0   // 音が消えるまでの余韻時間
            }
            this.vol = 0.1
            this.type = "sine"
        }

        // 初期化メソッド（ユーザー操作時に実行）
        initContext() {
            if (!this.audioCtx) {
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
        }
        // エンベロープ設定パラメータ（秒単位）
        // ディレイ設定用メソッド
        setDelay(env = {
            attack: 0.05,  // 音が立ち上がる時間
            decay: 0.5,    // 最大音量から維持音量に落ちる時間
            release: 1   // 音が消えるまでの余韻時間
        }) {
            this.envelope = env
        }
        changeType(n = 0) {
            if (n == 0) this.type = "sine"
            if (n == 1) this.type = "square"
            if (n == 2) this.type = "sawtooth"
            if (n == 3) this.type = "triangle"
        }

        start(hz) {if(finishing)return
            this.initContext();
            this.idCounter++;
            const id = `tone_${this.idCounter}`;

            const oscillator = this.audioCtx.createOscillator();
            const gainNode = this.audioCtx.createGain();

            oscillator.type = this.type;
            oscillator.frequency.setValueAtTime(hz, this.audioCtx.currentTime);

            // --- ADSR エンベロープ（開始処理）---
            if (this.envelope) {
                const now = this.audioCtx.currentTime;
                gainNode.gain.setValueAtTime(0.0001, now);
                // Attack: アタック時間で音量 0.2 まで立ち上げ
                gainNode.gain.linearRampToValueAtTime(this.vol, now + this.envelope.attack);
                // Decay: サステイン音量へ移行
                gainNode.gain.linearRampToValueAtTime(this.vol * 0.7, now + this.envelope.attack + this.envelope.decay);
            }
            oscillator.connect(gainNode);
            gainNode.connect(this.audioCtx.destination); // 原音
            if (this.delayNode) {
                gainNode.connect(this.delayNode);        // 残響音
            }
            oscillator.start();

            var playing = true

            this.activeNodes[id] = { oscillator, gainNode, hz, playing };
            return id;
        }

        stop(id) {
            const node = this.activeNodes[id];
            if (node) {
                const now = this.audioCtx.currentTime;
                // --- Release エンベロープ（終了処理）---
                // 現在の音量を一度固定
                if (this.envelope) {
                    node.gainNode.gain.cancelScheduledValues(now);
                    node.gainNode.gain.setValueAtTime(node.gainNode.gain.value, now);
                    // Release時間で 0 に落とす
                    node.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + this.envelope.release);

                    // フェードアウトが終わってからオシレーターを停止
                    setTimeout(() => {
                        node.oscillator.stop();
                        node.oscillator.disconnect();
                        node.gainNode.disconnect();
                    }, this.envelope.release * 1000);
                } else {
                    node.oscillator.stop();
                    node.oscillator.disconnect();
                    node.gainNode.disconnect();
                }

                //delete this.activeNodes[id];
                this.activeNodes[id].playing = false;
            }
        }
        // 鳴っているすべての音をまとめて停止する
        stopAll() {
            Object.keys(this.activeNodes).forEach(id => {
                this.stop(id);
            });
        }
        getHz() {
            var l = Object.values(this.activeNodes)
            l = l.filter(n => n.playing).sort((a, b) => a.hz - b.hz).map(n => n.hz)
            return l
        }
    }
