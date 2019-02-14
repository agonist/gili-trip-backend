class SlackJob
  include SuckerPunch::Job

  def perform(event)

    @slack ||= Slack::Web::Client.new
    @slack.chat_postMessage(channel: '#orders', text: "Order confirmed id : #{event}", as_user: true)

  end
end
