<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="4">
        <v-card
          class="mx-auto"
          max-width="400"
          tile
        >
          <v-list-item
            v-for="mess in messages"
            :key="mess.name"
          >
            <v-card
              class="rounded-lg"
              border="true, 1, solid"
              min-width="50%"
            >
              <v-card-header-text>
                {{ mess.name }}
              </v-card-header-text>
              <v-card-text>
                {{ mess.text }}
              </v-card-text>
            </v-card>
          </v-list-item>
          <form>
            <textarea
              name="message"
              rows="2"
              v-model="message"
              style="width: 100%"
            >

            </textarea>

            <v-btn
              class="mr-4"
              type="submit"
            >
              submit
            </v-btn>
          </form>
        </v-card>
        <v-btn
          class="mr-4"
          @click="storeClick"
        >
          store
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Chat',
  data() {
    return {
      user: {
        name: "max",
      },
      message: '',
      conn: null,
      log: '',
    }
  },
  computed: {
    ...mapState('chat', {
      messages: 'messages',
    }),
    classMessage(message) {
      return {
        'float-left float-end': message.name === this.user.name,
      }
    },
    nameErrors () {
      const errors = []
      if (!this.$v.message.$dirty) return errors
      !this.$v.message.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.message.required && errors.push('Name is required.')
      return errors
    },
  },
  methods: {
    ...mapActions('chat',{
      incrementAsync: 'incrementAsync',
      setMessage: 'setMessage',
    }),
    storeClick() {
      /*this.$store.commit({
        type: 'increment',
        amount: { id: 3, text: '...', done: true }
      })
      this.incrementAsync(20).then(() => {
        console.debug(this.count)
      })*/
      if (!this.conn) {
        return false;
      }
      if (!this.message) {
        return false;
      }
      this.conn.send(this.message);
      this.message = "";
      return false;

    },
    appendLog(item) {
      const doScroll = this.log.scrollTop > this.log.scrollHeight - this.log.clientHeight - 1;
      this.log.appendChild(item);
      if (doScroll) {
        this.log.scrollTop = this.log.scrollHeight - this.log.clientHeight;
      }
    },
    saveMessage(data) {
      const messages = data.split('\n');
      if (messages) {
        for (let i = 0; i < messages.length; i++) {
          let mess = {
            title: 'first',
            name: 'max',
            text: messages[i]
          }
          this.setMessage(mess)
        }
      }
    },
  },
  created() {
    if (window["WebSocket"]) {
      this.conn = new WebSocket("ws://localhost:8081/ws");
      /*this.conn.onclose = (evt) => {
        const item = document.createElement("div");
        item.innerHTML = "<b>Connection closed.</b>";
        this.appendLog(item);
      };*/
      this.conn.onmessage = ({data}) => {this.saveMessage(data)};

    } else {
      const item = document.createElement("div");
      item.innerHTML = "<b>Your browser does not support WebSockets.</b>";
      this.appendLog(item);
    }
  }
}
</script>
